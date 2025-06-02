// app/rereadlore/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const loreData = [
  {
    image: 'https://ucarecdn.com/4f24a376-c7b0-44f7-bf31-4d5119187a1a/dia1kopie.jpg',
    text: 'De Laatste Vrije Queeste\nLuisman — ook wel bekend als De Luis. Binnenkort laat hij zich vrijwillig ketenen aan prinses Juliette. Maar eerst wacht hem een laatste queeste. Twee nachten. Eén stad. Negen mannen. En nul schaamte.',
  },
  {
    image: 'https://ucarecdn.com/eafba73c-c94e-44d1-bcea-f15c1476eeea/dia2.jpg',
    text: 'The Fellowship of the Luis\nAcht bondgenoten, elk met hun eigen talent (en zwakheden), hebben zich verzameld. Samen vormen zij The Fellowship of the Luis. Ze zijn hier met één doel: Luis bijstaan op zijn pad naar… iets met tapas en trauma’s.',
  },
  {
    image: 'https://ucarecdn.com/e4868b4a-949a-46ce-9b05-7a8f7885d5e1/dia3.jpg',
    text: 'De Achievements\nDe tracker bevat proeven. Soms lomp. Soms briljant. Altijd onvergetelijk. Elke voltooiing brengt Luis dichter bij onsterfelijkheid. Of op z’n minst bij de brunch op zondag.',
  },
  {
    image: 'https://ucarecdn.com/214ae6ea-4e42-48cb-839a-d907c72dadb9/dia4.jpg',
    text: 'De Stad der Verleiding\nBarcelona is prachtig. Verraderlijk. Onvergeeflijk. Hier wordt Luis getest: zijn trouw, zijn moed, zijn nieren. Slechts wie z’n bewijs levert — in beeld — zal erkend worden als held.',
  },
  {
    image: 'https://ucarecdn.com/b529b0a6-86a3-4a0b-a793-067113b30a8c/dia5.jpg',
    text: 'Het Avontuur Begint\nDit is je kompas. Jouw pad naar eer. Scroll. Bewijs. Upload. Vergeet niks. Verlies jezelf. En als je ooit denkt “moet dit nou?” — ja. Ja, het moet.\n\nLuis — het is tijd.',
  },
];

const SUCCESS_SOUND_URL = 'https://ucarecdn.com/992303e1-a77d-4652-9259-fc956c090f01/levelup2.mp3';

export default function RereadLorePage() {
  const [step, setStep] = useState(0);
  const router = useRouter();

  const handleNext = () => {
    if (step === loreData.length - 1) {
      const audio = new Audio(SUCCESS_SOUND_URL);
      audio.play().catch(() => {});
      router.push('/');
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
          {step === loreData.length - 1 ? 'Terug naar de tracker' : 'Verder'}
        </button>
      </div>
    </div>
  );
}
