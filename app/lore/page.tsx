'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const loreData = [
  {
    image: '/lore1.jpg',
    text: 'De Laatste Vrije Queeste\nLuisman — ook wel bekend als De Luis. Binnenkort laat hij zich vrijwillig ketenen aan prinses Juliette. Maar eerst wacht hem een laatste queeste. Twee nachten. Eén stad. Negen mannen. En nul schaamte.',
  },
  {
    image: '/lore2.jpg',
    text: 'The Fellowship of the Luis\nAcht bondgenoten, elk met hun eigen talent (en zwakheden), hebben zich verzameld. Samen vormen zij The Fellowship of the Luis. Ze zijn hier met één doel: Luis bijstaan op zijn pad naar… iets met tapas en trauma’s.',
  },
  {
    image: '/lore3.jpg',
    text: 'De Achievements\nDe tracker bevat proeven. Soms lomp. Soms briljant. Altijd onvergetelijk. Elke voltooiing brengt Luis dichter bij onsterfelijkheid. Of op z’n minst bij de brunch op zondag.',
  },
  {
    image: '/lore4.jpg',
    text: 'De Stad der Verleiding\nBarcelona is prachtig. Verraderlijk. Onvergeeflijk. Hier wordt Luis getest: zijn trouw, zijn moed, zijn nieren. Slechts wie z’n bewijs levert — in beeld — zal erkend worden als held.',
  },
  {
    image: '/lore5.jpg',
    text: 'Het Avontuur Begint\nDit is je kompas. Jouw pad naar eer. Scroll. Bewijs. Upload. Vergeet niks. Verlies jezelf. En als je ooit denkt “moet dit nou?” — ja. Ja, het moet.\n\nLuis — het is tijd.',
  },
];

const SUCCESS_SOUND_URL = 'https://ucarecdn.com/64e3ee89-cecf-4995-bb1b-ad7aef31cbb3/achievementsucces.mp3';

export default function LorePage() {
  const [step, setStep] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const alreadySeen = localStorage.getItem('loreSeen');
    if (alreadySeen === 'true') {
      router.push('/app/login'); // ⬅️ Reeds gezien? Dan direct naar login
    }
  }, [router]);

  const handleNext = () => {
    if (step === loreData.length - 1) {
      const audio = new Audio(SUCCESS_SOUND_URL);
      audio.play().catch(() => {});
      localStorage.setItem('loreSeen', 'true');
      router.push('/app/login'); // ⬅️ Laatste slide: ga naar login
    } else {
      setStep((prev) => prev + 1);
    }
  };

  const { image, text } = loreData[step];
  const [title, ...paragraphs] = text.split('\n');

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <img
        src={image}
        alt="Lore image"
        className="max-w-full max-h-96 object-contain mb-8 rounded"
      />
      <div className="max-w-xl text-center space-y-4">
        <h1 className="text-3xl font-bold text-yellow-400">{title}</h1>
        {paragraphs.map((p, i) => (
          <p key={i} className="text-lg leading-relaxed">
            {p}
          </p>
        ))}
        <button
          onClick={handleNext}
          className="mt-6 bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded font-semibold"
        >
          {step === loreData.length - 1 ? 'Start het avontuur' : 'Verder'}
        </button>
      </div>
    </div>
  );
}
