## `cat /proc/cpuinfo`
CPU 정보를 열람할 수 있다.

```dockerfile
processor       : 0
BogoMIPS        : 108.00
Features        : fp asimd evtstrm crc32 cpuid
CPU implementer : 0x41
CPU architecture: 8
CPU variant     : 0x0
CPU part        : 0xd08
CPU revision    : 3

processor       : 1
BogoMIPS        : 108.00
Features        : fp asimd evtstrm crc32 cpuid
CPU implementer : 0x41
CPU architecture: 8
CPU variant     : 0x0
CPU part        : 0xd08
CPU revision    : 3

processor       : 2
BogoMIPS        : 108.00
Features        : fp asimd evtstrm crc32 cpuid
CPU implementer : 0x41
CPU architecture: 8
CPU variant     : 0x0
CPU part        : 0xd08
CPU revision    : 3

processor       : 3
BogoMIPS        : 108.00
Features        : fp asimd evtstrm crc32 cpuid
CPU implementer : 0x41
CPU architecture: 8
CPU variant     : 0x0
CPU part        : 0xd08
CPU revision    : 3

Hardware        : BCM2835
Revision        : c03114
Serial          : 10000000e19a2b57
Model           : Raspberry Pi 4 Model B Rev 1.4

```

```dockerfile
ex)

#코어 수
grep -c processor /proc/cpuinfo 

# 물리 CPU 개수
$ grep ^processor /proc/cpuinfo  | wc -l
> 4 # 현재 PC의 물리 CPU 수는 4개.


# CPU 당 물리 코어 개수
$ grep 'cpu cores' /proc/cpuinfo | tail -1
> 4 # 현재 PC의 CPU 당 물리 코어 개수는 4개


# Hyper Threading 여부
$ cat /proc/cpuinfo | egrep 'siblings|cpu cores' | head -2
> siblings       :    4
> cpu cores    :    4

```


## lscpu
/proc/cpu를 더 간단하게 볼 수 있는 명령

## top
```dockerfile
-n : 지정한 숫자만큼 화면 출력을 갱신한 후 수행
-u : 지정한 사용자의 프로세스를 모니터링
-b : 출력 결과를 파일이나 다른 프로그램으로 전달
-d : 화면 갱신 주기를 초 단위로 설정
-p : 지정한 PID 프로시스를 모니터링
```

## free
