## 우리에게 가시적인 영향

### 1. malloc의 한계
- 동적 메모리 할당자 (런타임 메모리 할당)
- 1990년대 설계로 단일 스레드 환경에 최적화
- **Global lock**으로 인한 멀티코어 병목
  - 모든 스레드가 하나의 lock을 경쟁
  - 2개 이상 스레드 사용 시 성능 붕괴
- **Fragmentation 문제**
  - Native Heap 중간의 free chunk는 OS 반환 불가
  - Free list가 메모리 전체에 분산
  - CPU 캐시 미스 빈번 발생
  - 장기 실행 시 메모리 누적 (실제 사례: 68% fragmentation)

### 2. jemalloc의 개선

**확장성 중심 설계 (멀티코어)**
- 극단적 성능 최적화 (통계 수집도 기본 비활성화)
- 메모리 단편화 최소화 중점

**핵심 전략**:
- **Multiple Arenas**: 프로세서 × 4개 arena 생성
  - malloc: `[Global Lock]` ← 모든 스레드 경쟁
  - jemalloc: `[Arena 0][Arena 1][Arena 2][Arena 3]` ← 분산 처리
- **Round-robin 스레드 할당**: Lock contention 최소화
- **TLS(Thread-Local Storage)**: arena 정보 캐싱으로 Lock-free 할당 경로
- **Size Class 세분화**: Quantum-spaced (16B 간격)로 internal fragmentation 감소
- **지연된 재활용**: 빈 run 즉시 삭제 안 함, system call 최소화

**효과**:
- 메모리 효율 + 캐시 locality 균형
- Arena 분산으로 병렬 처리 가능
- 4코어 환경에서 거의 선형 확장

### 3. 실제 영향

**메모리**:
- 동일 작업에 30-40% 메모리 절감
- Java 앱 실사례: 
	- fragmentation 68% 감소 → 비용 10% 절감
	- **JVM 내부 malloc 대체**:
		- JVM은 C로 작성되어 내부적으로 수많은 malloc 호출 발생
		- `LD_PRELOAD`로 jemalloc 로드 시 모든 `malloc()` → `jemalloc::malloc()` 대체
		- **영향 받는 영역**: 
			- Metaspace (클래스 메타데이터): 클래스 정보 저장
			- Code Cache (JIT 컴파일 코드): JIT 컴파일된 메소드 저장
			- Thread 구조체: 쓰레드 당 내부 관리 구조체
			- GC 메타데이터: GC 작업용 내부 데이터
			- Symbol Table: 문자열 상수, 메소드 이름 등 저장

**성능**:
- 멀티스레드 환경에서 2-3배 처리량 증가
- 응답 시간 감소

**안정성**:
- 장기 실행 시 메모리 반환 개선
- OOMKilled 빈도 감소


---
### 참고 문헌
[free BSD - jemalloc](https://people.freebsd.org/~jasone/jemalloc/bsdcan2006/jemalloc.pdf)

![[jemalloc.pdf]]