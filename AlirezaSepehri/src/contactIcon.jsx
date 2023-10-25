function breakName(name) {
  const array = name.split(" ");
  const onePart = array[0].slice(0, 1);
  if (array.length === 1) {
    return onePart;
  }
  return onePart + " " + array[array.length - 1].slice(0, 1);
}

export default function ContactIcon({ name }) {
  return (
    <div
      className={`w-[42px] h-[40px] rounded-xl text-yellow-300 text-[16px] 
    text-center pt-[7px] font-semibold ml-2 shadow-sm bg-pink-600`}
    >
      {breakName(name)}
    </div>
  );
}
