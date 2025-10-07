# ADR-001: Batch Module Architecture Design

## Status
Accepted

## Context

현재 예약 시스템은 Spring Boot 3.4.5와 Kotlin 2.0.10을 기반으로 Hexagonal Architecture와 Domain-Driven Design(DDD) 원칙을 따라 구현되어 있다. 

기존 모듈 구조:
- `shared-module`: 공통 Enumerations, 예외, 유틸리티
- `core-module`: 도메인 엔티티, 도메인 서비스 (순수 도메인 로직)
- `application-module`: Use Cases, Input/Output Ports
- `adapter-module`: Controllers, Security, Persistence, JPA Entities
- `test-module`: 테스트 유틸리티 및 공통 Fixtures

### 배치 처리 요구사항 발생
시스템이 성장하면서 다음과 같은 장시간 실행 배치 작업이 필요해졌다:
- **TimeTable 생성**: Schedule 데이터 기반으로 대용량 TimeTable 생성
- **데이터 정리**: 만료된 예약 정리 작업
- **통계 집계**: 주간/월간 리포트 생성
- **데이터 동기화**: 외부 시스템과의 데이터 연동

### 모듈 구조 결정 필요
배치 기능을 어디에 구현할지 결정해야 한다.

## Options Considered

### Option A: adapter-module 내부에 배치 패키지 추가

기존 `adapter-module`에 배치 관련 패키지를 추가하여 통합 관리하는 방식.

**장점**:
- 추가 모듈 생성 없이 기존 구조 활용
- 데이터베이스 설정 및 의존성 공유 가능
- 프로젝트 구조 단순성 유지

**단점**:
- 웹 애플리케이션과 배치 애플리케이션의 생명주기 강결합
- 장시간 배치 실행이 웹 서비스 메모리/CPU에 영향
- 배치 전용 설정과 웹 서비스 설정 혼재로 복잡성 증가
- 독립적 배포 및 스케일링 불가능

### Option B: 독립적인 batch-module 생성

배치 처리만을 담당하는 별도 모듈을 생성하는 방식.

**장점**:
- 웹 애플리케이션과 완전히 분리된 생명주기
- 배치 전용 최적화 설정 가능
- 독립적 배포 및 스케일링 가능
- 장시간 배치가 웹 서비스에 미치는 영향 차단

**단점**:
- 추가 모듈로 인한 프로젝트 복잡도 증가
- 일부 설정 및 의존성 중복 필요
- 모듈 간 통신 고려사항 증가

## Decision

**Option B: 독립적인 batch-module 생성**을 선택한다.

### Architecture Decision

#### 1. 모듈 구조
```
batch-module/
├── src/main/kotlin/com/reservation/batch/
│   ├── BatchApplication.kt          # 독립 실행 가능한 배치 애플리케이션
│   ├── config/                      # Spring Batch 설정
│   │   ├── BatchConfig.kt
│   │   ├── DatabaseConfig.kt
│   │   └── JobRepositoryConfig.kt
│   ├── job/                         # Job 정의 (Application Layer)
│   │   ├── ReservationCleanupJob.kt
│   │   ├── StatisticsAggregationJob.kt
│   │   └── DataSyncJob.kt
│   ├── step/                        # Step 정의 (Application Layer)
│   │   ├── CleanupStep.kt
│   │   ├── AggregationStep.kt
│   │   └── SyncStep.kt
│   ├── reader/                      # ItemReader (Adapter Layer)
│   │   ├── ExpiredReservationReader.kt
│   │   └── StatisticsDataReader.kt
│   ├── processor/                   # ItemProcessor (Application Layer)
│   │   ├── ReservationCleanupProcessor.kt
│   │   └── StatisticsProcessor.kt
│   ├── writer/                      # ItemWriter (Adapter Layer)
│   │   ├── CleanupResultWriter.kt
│   │   └── StatisticsWriter.kt
│   └── scheduler/                   # Job 스케줄링
│       ├── JobScheduler.kt
│       └── JobLauncher.kt
└── src/main/resources/
    ├── application-batch.yaml
    └── batch-jobs/
        └── job-configurations.yaml
```

#### 2. 의존성 설계
```kotlin
dependencies {
    // 기존 모듈 의존성
    implementation(project(":shared-module"))      // 공통 유틸리티, 예외
    implementation(project(":core-module"))        // 도메인 로직 재사용
    implementation(project(":application-module")) // Use Case 재사용
    
    // Spring Batch
    implementation("org.springframework.boot:spring-boot-starter-batch")
    implementation("org.springframework.boot:spring-boot-starter-quartz")
    
    // 데이터베이스 (기존 설정 재사용)
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
    implementation("mysql:mysql-connector-java")
    implementation("org.flywaydb:flyway-core")
    
    // 테스트
    testImplementation(project(":test-module"))
    testImplementation("org.springframework.batch:spring-batch-test")
}
```

#### 3. 계층별 역할 분담

**Application Layer (job/, step/, processor/)**
- Job과 Step 정의
- 비즈니스 로직 처리 (기존 application-module의 Use Case 재사용)
- 데이터 변환 및 검증

**Adapter Layer (reader/, writer/)**
- 데이터 소스와의 입출력 처리
- 외부 시스템과의 인터페이스

**Domain Layer**
- 기존 core-module의 도메인 로직 재사용
- 새로운 도메인 로직이 필요한 경우 core-module에 추가

#### 4. 실행 모델
- **독립 실행**: `ReservationBatchApplication.kt`로 웹 애플리케이션과 분리된 독립 실행
- **API 기반 실행**: REST Controller를 통한 유연한 배치 실행 제어
- **하이브리드 접근**: 개발(API) → 운영(Jenkins + API) → 확장(Quartz) 단계적 진화

## Rationale

### 모듈 분리 결정 근거

#### 1. 생명주기 격리의 필요성

**웹 애플리케이션**: 요청-응답 기반의 짧은 처리 시간, 높은 가용성 요구
**배치 애플리케이션**: 장시간 실행, 대용량 데이터 처리, 정기적 실행

두 애플리케이션의 특성이 근본적으로 다르기 때문에 같은 JVM에서 실행할 경우:
- 배치 실행 중 웹 서비스 성능 저하
- 웹 서비스 재시작 시 배치 작업 중단
- 메모리 누수나 장애 시 상호 영향

#### 2. 운영 관점에서의 독립성

**배포 독립성**: 배치 로직 변경이 웹 서비스 중단 없이 가능
**모니터링 분리**: 웹 서비스와 배치 작업의 서로 다른 메트릭 관리
**스케일링 독립성**: 배치 처리량에 따른 독립적 리소스 할당

#### 3. 현재 프로젝트 특성 고려

TimeTable 생성 배치는 대용량 데이터 처리로 상당한 시스템 리소스를 사용할 예정이며, 
이것이 실시간 예약 서비스에 영향을 주는 것은 부적절하다고 판단했다.

### 왜 기존 모듈을 재사용하는가?

1. **코드 중복 방지**: 이미 검증된 도메인 로직과 Use Case 재활용
2. **일관성 유지**: 동일한 비즈니스 규칙이 웹과 배치에서 동일하게 적용
3. **유지보수성**: 비즈니스 로직 변경 시 한 곳에서만 수정

### Spring Batch 선택 이유

1. **트랜잭션 관리**: 청크 단위 트랜잭션으로 안정적인 대용량 처리
2. **재시작 가능**: 실패 지점부터 재시작 가능한 내장 메커니즘
3. **모니터링**: JobRepository를 통한 실행 이력 및 상태 관리
4. **Spring 생태계**: 기존 Spring Boot 인프라와 자연스러운 통합


## Consequences

### Positive
- **아키텍처 일관성**: 기존 Hexagonal Architecture 원칙 유지
- **코드 재사용**: application-module과 core-module의 검증된 로직 활용
- **독립적 운영**: 웹 서비스와 독립적인 배포/운영 가능
- **확장성**: 새로운 배치 작업 추가 시 일관된 패턴 적용
- **테스트 용이성**: 각 계층별 단위 테스트 및 통합 테스트 가능

### Negative
- **복잡성 증가**: 추가 모듈로 인한 프로젝트 복잡도 상승
- **설정 관리**: 배치 전용 설정 파일 및 환경 변수 관리 필요
- **리소스 사용**: Spring Batch JobRepository용 추가 데이터베이스 테이블 필요

### Risks and Mitigation

**Risk: 모듈 간 의존성 관리 복잡성**
- Mitigation: 명확한 의존성 규칙 정의 및 문서화

**Risk: 배치 작업 실패 시 대응**
- Mitigation: 철저한 로깅, 알림 시스템, 재시작 메커니즘 구축

**Risk: 데이터 일관성 문제**
- Mitigation: 적절한 트랜잭션 경계 설정 및 Lock 정책 수립

## Implementation Plan

### Phase 1: 기반 구조 구축 (✅ 완료)
1. ✅ batch-module 생성 및 기본 설정
2. ✅ Spring Batch 설정 및 JobRepository 구성  
3. ✅ TimeTable 배치 Job/Step 구현

### Phase 2: 실행 인프라 구축 (진행 중)
1. ✅ REST API 기반 배치 실행 (TimeTableBatchController)
2. ✅ QueryDSL 기반 Cursor ItemReader 구현
3. 🔄 의존성 최적화 (core-module 런타임 포함)

### Phase 3: 운영 인프라 준비 (예정)
1. Jenkins Pipeline 구성 (배치 API 호출)
2. 모니터링 및 알림 시스템 연동
3. 운영 가이드 및 장애 대응 절차 작성

### Phase 4: 확장 준비 (미래)
1. 추가 배치 작업 템플릿 구성
2. Quartz 스케줄러 도입 검토
3. 배치 성능 최적화

## Related Decisions
- ADR-002: Batch Execution Strategy
- ADR-003: Batch Job Monitoring Strategy (예정)
- ADR-004: Data Migration Strategy (예정)

## Notes
- 이 결정은 프로젝트의 현재 아키텍처를 기반으로 하며, 향후 요구사항 변경에 따라 수정될 수 있음
- 배치 모듈의 성능 최적화는 실제 운영 데이터를 기반으로 점진적으로 개선할 예정