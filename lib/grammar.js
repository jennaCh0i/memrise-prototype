// Tiny rule-based "suggested fix" for the prototype (a real app would call a model).
const TIME = { "어제": "yesterday", "어젯밤": "last night", "주말에": "on the weekend", "지난주": "last week", "지난 주": "last week", "아까": "earlier", "작년": "last year", "오늘 아침": "this morning" };
const PAST = [
  ["마셔요", "마셨어요"], ["만나요", "만났어요"], ["먹어요", "먹었어요"], ["읽어요", "읽었어요"], ["놀아요", "놀았어요"],
  ["쉬어요", "쉬었어요"], ["들어요", "들었어요"], ["봐요", "봤어요"], ["가요", "갔어요"], ["와요", "왔어요"],
  ["타요", "탔어요"], ["자요", "잤어요"], ["사요", "샀어요"], ["해요", "했어요"], ["봅니다", "봤습니다"], ["합니다", "했습니다"],
];

export function suggestFix(raw) {
  const text = raw.trim();
  if (!/[가-힣]/.test(text)) return null;
  const m = text.match(/^(.*?)([.!?。]*)$/);
  let body = m[1], punct = m[2];

  const time = Object.keys(TIME).find((t) => body.includes(t));
  if (time) {
    const hit = PAST.find(([p]) => body.endsWith(p));
    if (hit) {
      return { fixed: body.slice(0, -hit[0].length) + hit[1] + punct, note: `${time} = ${TIME[time]}, so past tense: ${hit[0]} → ${hit[1]}` };
    }
  }
  if (!/(요|다|까|죠)$/.test(body) && /(어|아|해|야)$/.test(body)) {
    return { fixed: body + "요" + punct, note: "add 요 at the end to stay polite (해요체)" };
  }
  return null;
}
