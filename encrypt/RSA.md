# RSA

## OPENSSL
```shell
openssl genrsa -out keypair.pem 4096
# 이러면 순수하게 개인키가 생성
# 이대로 사용하면 보안상 문제가 될 수 있다고 한다.
# 위 형식은 `BEGIN PRIVATE KEY` 혹은 `BEGIN RSA PRIVATE KEY`로 시작한다.
# 이 포맷은 PKCS#8 포맷의 PrivateKeyInfo 형식이다.
### PKCS8은 privateKey를 정의하는 표준이다.


#RSAPrivateKey ::= SEQUENCE {
#  version           Version,
#  modulus           INTEGER,  -- n
#  publicExponent    INTEGER,  -- e
#  privateExponent   INTEGER,  -- d
#  prime1            INTEGER,  -- p
#  prime2            INTEGER,  -- q
#  exponent1         INTEGER,  -- d mod (p-1)
#  exponent2         INTEGER,  -- d mod (q-1)
#  coefficient       INTEGER,  -- (inverse of q) mod p
#  otherPrimeInfos   OtherPrimeInfos OPTIONAL
#}
## 참고 : https://dev.to/dandyvica/understanding-public-private-rsa-keys-3j81

openssl rsa -in keypair.pem -outform DER -pubout -out public.der
## privateKey 복호화 후 RSA PublicKey 추출
openssl pkcs8 -topk8 -nocrypt -in keypair.pem -outform DER -out private.der
## privateKey 복호화 후 RSA PrivateKey 추출
```
