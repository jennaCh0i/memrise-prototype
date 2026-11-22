// Lesson countdown: days are a D-day until the trip, so they count down to day 0.
const L = [
  ["subway\nride", "이번 역은 어디예요?", "What's this stop?"],
  ["convenience\nstore", "봉투는 괜찮아요.", "No bag, thanks."],
  ["street\nfood", "이거 하나 주세요.", "One of these, please."],
  ["airport\ncheck-in", "창가 자리로 주세요.", "A window seat, please."],
  ["coffee\norder", "아이스 아메리카노 한 잔 주세요.", "One iced americano, please."],
  ["T-money\ntop-up", "만 원 충전해 주세요.", "Top up 10,000 won, please."],
  ["pharmacy", "두통약 있어요?", "Do you have headache medicine?"],
  ["dinner\nparty", "잘 먹겠습니다!", "Thanks for the meal!"],
  ["hair\nsalon", "조금만 다듬어 주세요.", "Just a trim, please."],
  ["phone\nplan", "유심 카드 있어요?", "Do you sell SIM cards?"],
  ["money\nexchange", "환전하고 싶어요.", "I'd like to exchange money."],
  ["doctor's\nvisit", "여기가 아파요.", "It hurts here."],
  ["takeout", "포장해 주세요.", "To go, please."],
  ["taxi\nride", "여기서 세워 주세요.", "Please stop here."],
  ["museum\ntickets", "학생 할인 돼요?", "Is there a student discount?"],
  ["hotel\ncheck-in", "체크인하려고요.", "I'd like to check in."],
  ["asking for\ndirections", "명동역이 어디예요?", "Where's Myeongdong station?"],
];
export const LESSONS = L.map(([title, ko, en], i) => ({ day: L.length - i, title, ko, en }));
export const TODAY = 13;
