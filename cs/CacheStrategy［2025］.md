## 완전 패턴 (읽기+쓰기 모두 정의)

- **Cache-Aside**: 애플리케이션이 모든 캐시 관리 직접 담당
    - 읽기: 캐시 조회 → 미스 시 DB 조회 → 캐시 저장
    - 쓰기: DB 업데이트 → 캐시 무효화

## 읽기 전용 패턴

- **Read-Through**: 캐시가 DB 읽기 대행

## 쓰기 전용 패턴

- **Write-Through**: 캐시+DB 동시 업데이트
- **Write-Behind**: 캐시 먼저, DB 비동기
- **Write-Around**: 캐시 우회, DB만 업데이트

# 실제 조합 방식

## 1. 독립 사용

- **Cache-Aside**: Spring Cache 기본 방식

## 2. 읽기+쓰기 조합

- **Read-Through + Write-Through**: 캐시 라이브러리 완전 위임
- **Read-Through + Write-Behind**: 읽기 위임, 고성능 쓰기
- **Read-Through + Write-Around**: 읽기 위임, 쓰기 오염 방지


[참고](https://jhzlo.tistory.com/66?category=1299541)