## **RBAC** (Role-Based Access Control)

- **개념**: 사용자 → 역할 → 권한 매핑
- **구현**: `@PreAuthorize("hasRole('ADMIN')")`
- **장점**: 관리 용이, Spring Security 기본 지원
- **단점**: 정적, 복잡한 조건 처리 한계
- **사용**: 일반적인 웹 애플리케이션, 계층적 조직

## **ABAC** (Attribute-Based Access Control)

- **개념**: 사용자/리소스/환경 속성으로 동적 판단
- **구현**: `@PreAuthorize("hasPermission(#resource, 'READ')")`
- **장점**: 유연성, 세밀한 제어
- **단점**: 복잡성, 성능 오버헤드
- **사용**: 멀티테넌트, 개인정보 처리

## **CBAC** (Context-Based Access Control)

- **개념**: 시간, 위치, 디바이스 등 상황 정보 활용
- **구현**: IP 제한, 시간대 제한, 디바이스 인증
- **장점**: 보안성 향상
- **단점**: 구현 복잡도, 사용자 불편
- **사용**: 금융, 의료, 보안 중요 시스템

## **DAC** (Discretionary Access Control)

- **개념**: 리소스 소유자가 접근 권한 결정
- **구현**: 파일 시스템 권한, 게시글 작성자 권한
- **장점**: 유연성, 사용자 자율성
- **단점**: 일관성 부족, 보안 취약점
- **사용**: 파일 공유, 개인 콘텐츠 관리

## **MAC** (Mandatory Access Control)

- **개념**: 시스템이 보안 레벨로 강제 제어
- **구현**: 분류 레벨(기밀, 비밀 등) 기반
- **장점**: 높은 보안성
- **단점**: 유연성 부족, 복잡한 관리
- **사용**: 군사, 정부 시스템

## **PBAC** (Policy-Based Access Control)

- **개념**: 비즈니스 규칙을 정책으로 정의
- **구현**: Drools, Apache Shiro 등 정책 엔진
- **장점**: 복잡한 규칙 처리
- **단점**: 정책 관리 복잡성
- **사용**: 워크플로우, 승인 시스템

## **ReBAC** (Relationship-Based Access Control)

- **개념**: 엔티티 간 관계로 권한 결정
- **구현**: Google Zanzibar, 그래프 DB 활용
- **장점**: 직관적, 확장성
- **단점**: 관계 복잡성, 성능 고려
- **사용**: SNS, 조직도 기반 시스템