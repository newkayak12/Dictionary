> software engineering을 시스템 및 운영 문제에 적용하는 방법론


## SRE의 주요 목표와 원칙
> 유지보수 이상의 관점에서 시스템의 신뢰성을 측정하고 개선하는 것에 중점을 둔다.


1. **측정 및 자동화**:
	1. SRE는 모든 것을 측정하고, 반복적인 수동 작업을 자동화하는 것에 중점을 둔다.
	2. Human Error를 줄이고 더 가치있는 일에 집중할 수 있게 해준다.
2. **서비스 수준 목표(SLO) 설정**: 
	1. 시스템의 신뢰성을 정량적으로 측정하기 위해서 서비스 수준 지표(SLI)를 정의한다.
	2. 이를 기반으로 서비스 수준 목표(SLO)를 설정한다.
3. **실패 예산(Error Budget)**: 
	1. SLO를 달성하는 데 허용되는 실패의 총량을 실패 예산이라고 한다.
	2. 개발팀이 새로운 기능을 배포하는 속도를 조절하는 데 사용된다.
4. 문화 공유: 
	1. Dev, Ops가 동일한 목표를 가지고 협력하는 DevOps 문화를 기반으로 한다.

## SRE Engineer
> 개발자와 운영자 역할을 모두 수행한다.

- 가용성, 성능, 지연 시간, 효율성 등 시스템의 주요 지표 모니터링 및 분석
- 자동화 도구 개발 및 유지보수
- 장애 발생 시 원인 분석 및 해결
- 장애 후 재발 방지를 위한 사후 분석(Postmortem) 진행
- 시스템 확장성 및 배포 자동화(CI/CD) 개선

-----
### SLI(Service Level Indicator) - 서비스 수준 지표
- 실제 측정 기준, 시스템/ 서비스의 모니터링 메트릭
- 서비스 성능을 정량적으로 측정하는 지표
- "무엇을 측정할 것인가?"에 대한 대답
- 가용성(Availability)
- 응답시간(Latency)
- 처리량(Throughput)
- 에러율(Error Rate)
#### SLO(Service Level Objective) - 서비스 수준 목표
- 운영 기준과 목표 설정
- 내부적으로 설정한 서비스 품질 목표
- SLI에 대한 구체적인 목표 값 또는 범위 설정
- "우리가 달성하고자 하는 목표는 무엇인가?"에 대한 대답
- 개발, 운영팀이 합의 하는 
- 너무 공격적이지 않으면서 고객의 기대를 충족할 수 있는 현실적인 수준
- 가용성 SLO
- 응답 시간 SLO
- 에러율 SLO
#### SLA(Service Level Agreement) - 서비스 수준 계약
- 공식 계약

#### Error Budget
- SLO를 위반할 수 있는 허용 가능한 총량
- 100% - SLO
- 개발팀이 실험할 수 있는 자유를 제공

#### Incident Metrics - 장애 지표
|**지표**|**영문명**|**설명**|
|---|---|---|
|MTTD|Mean Time to Detect|문제를 발견하는 데 걸린 시간|
|MTTI|Mean Time to Identifier|문제 원인을 인지한 시간|
|MTTK|Mean Time to Know|장애복구 방안을 마련하는데까지 소요된 시간|
|MTTR|Mean Time to Repair|장애복구 완료되기까지 소요된 시간|
|MTBF|Mean Time Between Failures|두 장애 사이의 평균 정상 운영 시간으로, 시스템의 신뢰성(Reliability) 지표로 사용됨|
- MTTR이 짧고, MTBF가 길수록 이상적


--- 
함께 보기 [[CSP(Critical Serving Path)]]