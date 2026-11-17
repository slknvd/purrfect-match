// Everything editable lives here: the shelter, the cats, the questions.
// Trait numbers run 0..1. Cat profiles are my first read from one visit, provisional
// until the shelter staff confirm them.

export const SHELTER = { name: { en: "I am alive", ru: "Я живой" }, city: { en: "Astana", ru: "Астана" }, handle: "@i_am_alive_shelter", link: "https://instagram.com/i_am_alive_shelter" };

// What a person brings (answers)        What a cat is (profile)
// energy  how much play they want   <-> energy  how much play she needs
// close   how much contact          <-> close   how much contact she seeks
// talk    how much chatter          <-> talk    how vocal she is
// bold    how outgoing they are     <-> bold    how confident she is with new people
// alone   how much they're away     <-> indep   how well she does on her own
// busy    how busy their life is    <-> social  how well she takes other animals, kids, guests
// care    patience                  <-> need    how much patience or care she needs
// groom   liking for upkeep         <-> coat    how much brushing her coat needs
export const PAIRS = [
  ["energy", "energy", "match"], ["close", "close", "match"], ["talk", "talk", "match"], ["bold", "bold", "match"],
  ["alone", "indep", "enough"], ["busy", "social", "enough"], ["care", "need", "covers"], ["groom", "coat", "covers"],
];
export const LABEL = {
  en: { energy: "Play", close: "Closeness", talk: "Chatter", bold: "Nerve", alone: "Time alone", busy: "Busy home", care: "Patience", groom: "Brushing" },
  ru: { energy: "Игра", close: "Близость", talk: "Болтовня", bold: "Смелость", alone: "Одиночество", busy: "Шумный дом", care: "Терпение", groom: "Уход" },
};

export const CATS = [
  { id: "zasranka", name: { en: "Zasranka", ru: "Засранка" }, look: { en: "Short-haired tuxedo with white socks.", ru: "Чёрно-белая, в белых носках." },
    t: { energy: 0.85, close: 0.5, talk: 0.7, bold: 0.85, indep: 0.45, social: 0.6, need: 0.3, coat: 0.15 } },
  { id: "clara", name: { en: "Clara", ru: "Клара" }, look: { en: "Tabby. One eye is cloudy, the other misses nothing.", ru: "Полосатая. Один глаз мутный, второй видит всё." },
    t: { energy: 0.35, close: 0.75, talk: 0.35, bold: 0.5, indep: 0.5, social: 0.45, need: 0.7, coat: 0.15 } },
  { id: "bari", name: { en: "Bari", ru: "Бари" }, look: { en: "Tabby and ginger patches on white.", ru: "Полосатые и рыжие пятна на белом." },
    t: { energy: 0.3, close: 0.6, talk: 0.3, bold: 0.55, indep: 0.65, social: 0.6, need: 0.25, coat: 0.2 } },
  { id: "kinder", name: { en: "Kinder", ru: "Киндер" }, look: { en: "Tabby with folded ears and a serious face.", ru: "Полосатый, вислоухий, очень серьёзный." },
    t: { energy: 0.3, close: 0.3, talk: 0.2, bold: 0.5, indep: 0.85, social: 0.35, need: 0.4, coat: 0.2 } },
  { id: "belka", name: { en: "Belka", ru: "Белка" }, look: { en: "White and very fluffy.", ru: "Белая и очень пушистая." },
    t: { energy: 0.45, close: 0.55, talk: 0.55, bold: 0.4, indep: 0.5, social: 0.4, need: 0.45, coat: 0.95 } },
  { id: "clever", name: { en: "Clever", ru: "Клевер" }, look: { en: "Long-haired tuxedo with a white bib.", ru: "Пушистый, чёрный, с белой манишкой." },
    t: { energy: 0.55, close: 0.5, talk: 0.45, bold: 0.75, indep: 0.6, social: 0.7, need: 0.3, coat: 0.8 } },
  { id: "felix", name: { en: "Felix", ru: "Феликс" }, look: { en: "White with black patches. Sleeps on windowsills.", ru: "Белый с чёрными пятнами. Спит на подоконниках." },
    t: { energy: 0.15, close: 0.65, talk: 0.2, bold: 0.45, indep: 0.75, social: 0.55, need: 0.2, coat: 0.15 } },
  { id: "anatoliy", name: { en: "Anatoliy", ru: "Анатолий" }, look: { en: "Silver tabby with a white chest.", ru: "Серебристый, полосатый, с белой грудкой." },
    t: { energy: 0.4, close: 0.4, talk: 0.25, bold: 0.2, indep: 0.6, social: 0.3, need: 0.75, coat: 0.2 } },
  { id: "bian", name: { en: "Bian", ru: "Биан" }, look: { en: "Black and long-haired.", ru: "Чёрная пушистая шерсть." },
    t: { energy: 0.25, close: 0.5, talk: 0.3, bold: 0.45, indep: 0.75, social: 0.5, need: 0.3, coat: 0.75 } },
  { id: "sam", name: { en: "Sam", ru: "Сэм" }, look: { en: "Grey with a white chest and paws.", ru: "Серый, с белой грудкой и лапами." },
    t: { energy: 0.75, close: 0.75, talk: 0.5, bold: 0.75, indep: 0.3, social: 0.8, need: 0.25, coat: 0.2 } },
];

// Each answer says something about one to three traits. w is how much the question counts (default 1).
// Answers: [english, russian, traits]
export const QUESTIONS = [
  { q: { en: "Empty bus. Where do you sit?", ru: "Пустой автобус. Куда ты сядешь?" }, a: [
    ["Front, next to the driver.", "Вперёд, рядом с водителем.", { bold: 0.9, talk: 0.7 }],
    ["Back corner, hood up.", "В самый конец, в капюшоне.", { bold: 0.1, close: 0.2 }],
    ["Wherever the sun is.", "Туда, где солнце.", { energy: 0.2, close: 0.6 }],
    ["I stand. I always stand.", "Я стою. Я всегда стою.", { energy: 0.9 }]] },
  { q: { en: "Your phone is at 3% and there's no charger.", ru: "На телефоне 3%, зарядки нет." }, a: [
    ["I tell everyone, loudly.", "Громко сообщаю об этом всем.", { talk: 0.95 }],
    ["Finally, nobody can reach me.", "Наконец-то меня никто не достанет.", { close: 0.15, alone: 0.8 }],
    ["I borrow one from a stranger.", "Попрошу зарядку у незнакомца.", { bold: 0.95 }],
    ["It's always at 3%.", "У меня всегда 3%.", { care: 0.2, groom: 0.2 }]] },
  { q: { en: "An IKEA wardrobe, 214 steps, nobody to help.", ru: "Шкаф из ИКЕА, 214 шагов, помочь некому." }, a: [
    ["I read the whole booklet first.", "Сначала читаю всю инструкцию.", { care: 0.9, groom: 0.8 }],
    ["Halfway through I improvise.", "На середине начинаю импровизировать.", { energy: 0.7, bold: 0.7 }],
    ["It stays in the box until spring.", "Полежит в коробке до весны.", { energy: 0.1, groom: 0.1 }],
    ["I call someone. That's the plan.", "Позвоню кому-нибудь. Это и есть план.", { close: 0.8, busy: 0.6 }]] },
  { q: { en: "A drill starts next door. Sunday, 8am.", ru: "У соседей дрель. Воскресенье, 8 утра." }, a: [
    ["Knock on the wall. Twice.", "Стучу в стену. Дважды.", { bold: 0.9, talk: 0.7 }],
    ["Headphones. Problem solved.", "Наушники. Вопрос закрыт.", { talk: 0.1, care: 0.6 }],
    ["Get up. The day's started anyway.", "Встаю. День всё равно начался.", { energy: 0.9 }],
    ["Write a note. Never send it.", "Пишу записку. Так и не отношу.", { bold: 0.15, care: 0.5 }]] },
  { q: { en: "How do you eat a chocolate bar?", ru: "Как ты ешь шоколадку?" }, a: [
    ["Row by row. There are rules.", "Ряд за рядом. Есть правила.", { groom: 0.9, care: 0.7 }],
    ["All of it, standing in the kitchen.", "Всю сразу, стоя на кухне.", { energy: 0.8 }],
    ["One square a day for a week.", "По дольке в день, целую неделю.", { care: 0.95 }],
    ["I share it, then regret it.", "Делюсь, а потом жалею.", { close: 0.8, busy: 0.7 }]] },
  { q: { en: "The lift is stuck. It's you and one stranger.", ru: "Лифт застрял. В нём ты и незнакомец." }, a: [
    ["By the time we're out I know their life story.", "К спасению я знаю всю его биографию.", { talk: 1, bold: 0.8 }],
    ["I study the floor buttons very closely.", "Очень внимательно изучаю кнопки.", { talk: 0.05, bold: 0.15 }],
    ["I press everything at once.", "Жму все кнопки сразу.", { energy: 0.9, care: 0.15 }],
    ["I sit down. This could take a while.", "Сажусь на пол. Это надолго.", { care: 0.9, energy: 0.2 }]] },
  { q: { en: "A free Saturday, and nobody knows you're free.", ru: "Свободная суббота, и никто об этом не знает." }, a: [
    ["I don't leave the bed.", "Не вылезаю из кровати.", { energy: 0.1, alone: 0.2 }],
    ["Out the door, back after dark.", "Ухожу из дома и возвращаюсь затемно.", { energy: 0.9, alone: 0.9 }],
    ["I tell someone within the hour.", "Через час уже кому-нибудь пишу.", { close: 0.9, busy: 0.6 }],
    ["I clean the whole flat.", "Убираю всю квартиру.", { groom: 0.9, energy: 0.7 }]] },
  { q: { en: "Someone moved the things on your desk.", ru: "Кто-то переставил вещи на твоём столе." }, a: [
    ["I notice at once and put it all back.", "Замечаю сразу и ставлю как было.", { groom: 0.8, close: 0.2 }],
    ["I wouldn't notice.", "Даже не замечу.", { groom: 0.1, care: 0.7 }],
    ["I ask who did it. Loudly.", "Спрашиваю, кто это сделал. Громко.", { talk: 0.9, bold: 0.8 }],
    ["Nice, someone was here.", "Приятно, кто-то заходил.", { close: 0.85, busy: 0.7 }]] },
  { q: { en: "Your suitcase, the night before a flight.", ru: "Твой чемодан в ночь перед вылетом." }, a: [
    ["Packed three days ago.", "Собран три дня назад.", { care: 0.9, groom: 0.8 }],
    ["I'm packing it right now.", "Собираю прямо сейчас.", { energy: 0.7, care: 0.3 }],
    ["A backpack. It's always a backpack.", "Рюкзак. У меня всегда рюкзак.", { alone: 0.9, bold: 0.7 }],
    ["Someone is helping me pack.", "Мне кто-нибудь помогает.", { close: 0.8, busy: 0.5 }]] },
  { q: { en: "A friend said \"there in 5\". That was 40 minutes ago.", ru: "Друг написал «буду через 5 минут». Прошло сорок." }, a: [
    ["It's fine, I brought a book.", "Ничего, у меня с собой книга.", { care: 0.95, talk: 0.2 }],
    ["I've sent twelve messages.", "От меня уже двенадцать сообщений.", { talk: 0.9, care: 0.15 }],
    ["I was late too.", "Я тоже опаздываю.", { energy: 0.3, care: 0.5 }],
    ["I ordered without them.", "Уже заказываю без него.", { bold: 0.85, close: 0.2 }]] },
  { q: { en: "What is your camera roll mostly made of?", ru: "Чего больше всего в твоей галерее?" }, a: [
    ["People I love.", "Людей, которых я люблю.", { close: 0.95, busy: 0.7 }],
    ["Screenshots I'll never open.", "Скриншотов, которые я не открою.", { groom: 0.15 }],
    ["Food and the sky.", "Еды и неба.", { energy: 0.3, close: 0.4 }],
    ["The same thing from nine angles.", "Одного и того же с девяти ракурсов.", { care: 0.8, groom: 0.7 }]] },
  { q: { en: "You wake up at 4am for no reason.", ru: "Ты просыпаешься в 4 утра без причины." }, w: 1.2, a: [
    ["I lie there. It's nice and quiet.", "Лежу. Тихо и хорошо.", { alone: 0.8, talk: 0.1, close: 0.3 }],
    ["I text whoever might be awake.", "Пишу тому, кто может не спать.", { close: 0.9, talk: 0.8, alone: 0.1 }],
    ["I get up and start the day.", "Встаю и начинаю день.", { energy: 0.9 }],
    ["The fridge.", "Холодильник.", { energy: 0.5, care: 0.4 }]] },
  { q: { en: "The group chat has 200 unread messages.", ru: "В общем чате 200 непрочитанных." }, w: 1.2, a: [
    ["I read every one.", "Читаю все до одного.", { busy: 0.9, talk: 0.7 }],
    ["Mark as read.", "Отмечаю прочитанным.", { busy: 0.1, talk: 0.2 }],
    ["I wrote 150 of them.", "150 из них мои.", { talk: 1, busy: 0.9, bold: 0.8 }],
    ["It has been on mute for a year.", "Чат уже год без звука.", { busy: 0.05, alone: 0.7 }]] },
  { q: { en: "Your plant is dying. Be honest.", ru: "Твой цветок умирает. Только честно." }, w: 1.3, a: [
    ["It's my fourth this year.", "Это уже четвёртый за год.", { care: 0.15, alone: 0.8 }],
    ["New pot, new soil, and I talk to it.", "Новый горшок, новая земля, и я с ним разговариваю.", { care: 0.95, talk: 0.7 }],
    ["There's a watering schedule on the fridge.", "На холодильнике висит график полива.", { care: 0.8, groom: 0.8 }],
    ["I don't keep plants. I know myself.", "Я не завожу цветы. Я себя знаю.", { care: 0.3, alone: 0.9 }]] },
  { q: { en: "How long does a \"quick tidy\" take you?", ru: "Сколько у тебя длится «быстро прибраться»?" }, w: 1.3, a: [
    ["Five minutes. I mean it.", "Пять минут. Серьёзно.", { groom: 0.3, energy: 0.7 }],
    ["Three hours, and now the shelf is sorted by colour.", "Три часа, и полка теперь разложена по цветам.", { groom: 1 }],
    ["I move the pile to another room.", "Переношу кучу в другую комнату.", { groom: 0.05 }],
    ["I put music on and it turns into a party.", "Включаю музыку, и это уже вечеринка.", { energy: 0.8, talk: 0.7, groom: 0.5 }]] },
  { q: { en: "A party where you know one person, and they just left.", ru: "На вечеринке ты знаешь одного человека, и он только что ушёл." }, a: [
    ["I'm gone within four minutes.", "Через четыре минуты меня там нет.", { bold: 0.05, busy: 0.1 }],
    ["I find the host's pet.", "Иду искать хозяйского кота.", { close: 0.7, bold: 0.3, care: 0.7 }],
    ["New best friend by midnight.", "К полуночи у меня новый лучший друг.", { bold: 1, busy: 0.9, talk: 0.8 }],
    ["I stand by the food and look busy.", "Стою у еды с занятым видом.", { bold: 0.3, energy: 0.3 }]] },
  { q: { en: "Home after two weeks away. The first ten minutes?", ru: "Ты дома после двух недель. Первые десять минут?" }, w: 1.3, a: [
    ["Everything is unpacked.", "Всё уже разобрано.", { groom: 0.9, energy: 0.7 }],
    ["I lie on the floor.", "Лежу на полу.", { energy: 0.1, close: 0.5 }],
    ["I call everyone I missed.", "Звоню всем, по кому скучаю.", { close: 0.9, talk: 0.8, alone: 0.1 }],
    ["I'm looking up the next trip.", "Смотрю билеты на следующую поездку.", { alone: 1, energy: 0.8 }]] },
  { q: { en: "Someone fell asleep on your arm and it's gone numb.", ru: "Кто-то уснул на твоей руке, и она затекла." }, a: [
    ["I don't move. For hours if I have to.", "Не двигаюсь. Хоть несколько часов.", { close: 1, care: 0.9 }],
    ["I slide out very slowly.", "Очень медленно вытаскиваю руку.", { close: 0.5, care: 0.6 }],
    ["I wake them up, kindly.", "Бужу, но по-доброму.", { close: 0.3, bold: 0.7 }],
    ["This is why I sit in the armchair.", "Вот поэтому я сижу в кресле.", { close: 0.05, alone: 0.6 }]] },
];
