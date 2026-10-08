# ICN 프로토타입

인천파크(9.81 파크 ICN) 운영시스템 와이어프레임 모음이에요. 기획 검토용이고 실제 데이터는 들어 있지 않아요.

## 바로 보기

| 화면 | 주소 |
| --- | --- |
| 백오피스 · 판매 관리 | https://jungsunyou.github.io/icn-prototype/backoffice/ |
| 결제 UI/UX 명세 | https://jungsunyou.github.io/icn-prototype/payment-ui-spec.html |
| 복합결제 코드·영수증 | https://jungsunyou.github.io/icn-prototype/composite-receipt.html |
| 단체 예약 관리 | https://jungsunyou.github.io/icn-prototype/group/ |

루트 주소(https://jungsunyou.github.io/icn-prototype/)로 들어오면 백오피스로 바로 이동해요.

### 백오피스 화면별 바로가기

| 메뉴 | 주소 |
| --- | --- |
| PSU 관리 | https://jungsunyou.github.io/icn-prototype/backoffice/#psu |
| 상품 관리 | https://jungsunyou.github.io/icn-prototype/backoffice/#product |
| 가격 정책 관리 | https://jungsunyou.github.io/icn-prototype/backoffice/#pricing |
| 재고 관리 | https://jungsunyou.github.io/icn-prototype/backoffice/#stock |
| 프로모션 관리 | https://jungsunyou.github.io/icn-prototype/backoffice/#promo |

## 구성

### 백오피스 · 판매 관리 — `backoffice/`

`backoffice/index.html`이 사이드바가 있는 셸이고, 메뉴를 누르면 각 화면이 열려요.

| 파일 | 화면 | 주요 내용 |
| --- | --- | --- |
| `psu.html` | PSU 관리 | 상품을 만드는 가장 작은 단위. JAM/비JAM, 정가, 버전, 사용 중 상품 |
| `product.html` | 상품 관리 | 패키지/추가구매, PSU 구성과 원가 합계, 다국어 노출, 판매 채널, OTA 연동 코드 |
| `pricing.html` | 가격 정책 관리 | 상품별 기준가, 시즌, 가격 캘린더, 채널, 계산 규칙 |
| `stock.html` | 재고 관리 | 액티비티별 시간대 재고, 한정 판매 |
| `promo.html` | 프로모션 관리 | 프로모션(일반/신분/교환), 쿠폰 발급, 쿠폰 조회 |

### 단체 예약 관리 — `group/`

제주 운영시스템(OS)에 구현된 단체 예약 관리 화면을 실제 코드 기준으로 옮기고, 인천에서 달라지는 부분을 반영한 시안이에요. 탭 7개(대시보드, 캘린더, 거래처 관리, 답사, 접수, 예약, 주문/결제/정산)가 모두 동작해요.

| 인천에서 바뀐 곳 | 내용 |
| --- | --- |
| 레이스 인원 입력 | 운전자, 주니어 운전자, 동승자 수를 나눠 넣어요. 동승자는 운전자 수까지, 주니어 운전자는 동승자와 함께만 넣을 수 있어요. |
| 발권 | 로봉(NFC) 1인 1티켓이에요. 운전자와 동승자는 짝으로 함께 발권·취소돼요. 레이서 분리·병합은 없어요. |
| 부분 환불 | 결제 금액에서 이용한 JAM 원가를 빼고 환불해요. |
| 거래처 수수료 | 제주와 같이 기본 수수료와 단체 상품별 개별 수수료를 둬요. 동승자는 레이스 포함 패키지 수수료를 따라요. |
| 대시보드 | 인천은 첫해라 전년 비교가 없어요. 정해지지 않은 지표는 보라색으로 남겨 두었어요. |

### 결제 UI/UX 명세 — `payment-ui-spec.html`

파크 운영 시스템(인포데스크) 결제 화면의 목업과 개발 스펙이에요. 결제수단 변경, 분할결제, 현금영수증을 다뤄요. `payment-ui-spec.pdf`는 모든 상태를 펼친 인쇄본이에요.

## 읽는 법

- **보라색 영역**은 아직 정하는 중이거나 안내용 문구예요. 구현 대상이 아니에요.
- 개인정보 보호를 위해 조회는 티켓번호, 표시는 닉네임 기준으로 그렸어요.
- 화면 속 닉네임·티켓번호·수치는 모두 예시예요.
- 검색엔진에 노출되지 않도록 모든 페이지에 `noindex`를 넣었어요.
