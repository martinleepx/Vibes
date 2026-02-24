import type { Verse } from '@/types';

export const CRISIS_VERSES: Verse[] = [
  {
    id: '1',
    reference: '1 Corinthians 10:13',
    text: 'No temptation has overtaken you that is not common to man. God is faithful, and he will not let you be tempted beyond your ability, but with the temptation he will also provide the way of escape, that you may be able to endure it.',
    translation: 'ESV',
    theme: 'temptation',
  },
  {
    id: '2',
    reference: 'Romans 8:37',
    text: 'No, in all these things we are more than conquerors through him who loved us.',
    translation: 'ESV',
    theme: 'victory',
  },
  {
    id: '3',
    reference: 'Philippians 4:13',
    text: 'I can do all things through him who strengthens me.',
    translation: 'ESV',
    theme: 'strength',
  },
  {
    id: '4',
    reference: 'James 4:7',
    text: 'Submit yourselves therefore to God. Resist the devil, and he will flee from you.',
    translation: 'ESV',
    theme: 'resistance',
  },
  {
    id: '5',
    reference: 'Galatians 5:16',
    text: 'But I say, walk by the Spirit, and you will not gratify the desires of the flesh.',
    translation: 'ESV',
    theme: 'spirit',
  },
  {
    id: '6',
    reference: 'Psalm 119:9',
    text: 'How can a young man keep his way pure? By guarding it according to your word.',
    translation: 'ESV',
    theme: 'purity',
  },
  {
    id: '7',
    reference: '2 Timothy 2:22',
    text: 'So flee youthful passions and pursue righteousness, faith, love, and peace, along with those who call on the Lord from a pure heart.',
    translation: 'ESV',
    theme: 'flee',
  },
  {
    id: '8',
    reference: 'Romans 6:14',
    text: 'For sin will have no dominion over you, since you are not under law but under grace.',
    translation: 'ESV',
    theme: 'freedom',
  },
  {
    id: '9',
    reference: 'Isaiah 41:10',
    text: 'Fear not, for I am with you; be not dismayed, for I am your God; I will strengthen you, I will help you, I will uphold you with my righteous right hand.',
    translation: 'ESV',
    theme: 'strength',
  },
  {
    id: '10',
    reference: 'John 8:36',
    text: 'So if the Son sets you free, you will be free indeed.',
    translation: 'ESV',
    theme: 'freedom',
  },
  {
    id: '11',
    reference: 'Psalm 46:1',
    text: 'God is our refuge and strength, a very present help in trouble.',
    translation: 'ESV',
    theme: 'refuge',
  },
  {
    id: '12',
    reference: 'Romans 8:1',
    text: 'There is therefore now no condemnation for those who are in Christ Jesus.',
    translation: 'ESV',
    theme: 'grace',
  },
  {
    id: '13',
    reference: 'Hebrews 4:15-16',
    text: 'For we do not have a high priest who is unable to sympathize with our weaknesses, but one who in every respect has been tempted as we are, yet without sin. Let us then with confidence draw near to the throne of grace, that we may receive mercy and find grace to help in time of need.',
    translation: 'ESV',
    theme: 'grace',
  },
  {
    id: '14',
    reference: 'Micah 7:8',
    text: 'Rejoice not over me, O my enemy; when I fall, I shall rise; when I sit in darkness, the Lord will be a light to me.',
    translation: 'ESV',
    theme: 'perseverance',
  },
  {
    id: '15',
    reference: 'Psalm 34:18',
    text: 'The Lord is near to the brokenhearted and saves the crushed in spirit.',
    translation: 'ESV',
    theme: 'comfort',
  },
];

export const DAILY_VERSES: Verse[] = [
  {
    id: 'd1',
    reference: 'Lamentations 3:22-23',
    text: 'The steadfast love of the Lord never ceases; his mercies never come to an end; they are new every morning; great is your faithfulness.',
    translation: 'ESV',
    theme: 'morning',
  },
  {
    id: 'd2',
    reference: 'Psalm 143:8',
    text: 'Let me hear in the morning of your steadfast love, for in you I trust. Make me know the way I should go, for to you I lift up my soul.',
    translation: 'ESV',
    theme: 'morning',
  },
  {
    id: 'd3',
    reference: 'Isaiah 40:31',
    text: 'But they who wait for the Lord shall renew their strength; they shall mount up with wings like eagles; they shall run and not be weary; they shall walk and not faint.',
    translation: 'ESV',
    theme: 'strength',
  },
  {
    id: 'd4',
    reference: 'Joshua 1:9',
    text: 'Have I not commanded you? Be strong and courageous. Do not be frightened, and do not be dismayed, for the Lord your God is with you wherever you go.',
    translation: 'ESV',
    theme: 'courage',
  },
  {
    id: 'd5',
    reference: '2 Corinthians 5:17',
    text: 'Therefore, if anyone is in Christ, he is a new creation. The old has passed away; behold, the new has come.',
    translation: 'ESV',
    theme: 'identity',
  },
  {
    id: 'd6',
    reference: 'Romans 12:2',
    text: 'Do not be conformed to this world, but be transformed by the renewal of your mind.',
    translation: 'ESV',
    theme: 'renewal',
  },
  {
    id: 'd7',
    reference: 'Philippians 4:8',
    text: 'Finally, brothers, whatever is true, whatever is honorable, whatever is just, whatever is pure, whatever is lovely, whatever is commendable, if there is any excellence, if there is anything worthy of praise, think about these things.',
    translation: 'ESV',
    theme: 'mindset',
  },
];

export const MILESTONE_BADGES = [
  {
    days: 1,
    label: 'First Step',
    description: 'You showed up. That takes courage.',
    scripture: 'The journey of a thousand miles begins with a single step.',
    scriptureRef: 'Proverbs 4:26',
    icon: '🌱',
    color: '#68B68D',
  },
  {
    days: 3,
    label: 'Three Days Strong',
    description: 'Three days of choosing freedom.',
    scripture: 'For everything there is a season, and a time for every matter under heaven.',
    scriptureRef: 'Ecclesiastes 3:1',
    icon: '🌿',
    color: '#4A90A4',
  },
  {
    days: 7,
    label: 'One Week Free',
    description: 'A full week of victory. God sees your faithfulness.',
    scripture: 'The steadfast love of the Lord never ceases; his mercies never come to an end.',
    scriptureRef: 'Lamentations 3:22',
    icon: '🌊',
    color: '#2E6B7D',
  },
  {
    days: 14,
    label: 'Two Weeks',
    description: 'Two weeks of renewed commitment.',
    scripture: 'I can do all things through him who strengthens me.',
    scriptureRef: 'Philippians 4:13',
    icon: '✨',
    color: '#68B68D',
  },
  {
    days: 30,
    label: 'One Month',
    description: 'Thirty days of transformation. You are not the same person.',
    scripture: 'Do not be conformed to this world, but be transformed by the renewal of your mind.',
    scriptureRef: 'Romans 12:2',
    icon: '🔥',
    color: '#F0B454',
  },
  {
    days: 60,
    label: 'Two Months',
    description: 'Sixty days. A new life is taking shape.',
    scripture: 'Therefore, if anyone is in Christ, he is a new creation.',
    scriptureRef: '2 Corinthians 5:17',
    icon: '🌅',
    color: '#4A90A4',
  },
  {
    days: 90,
    label: 'Ninety Days',
    description: 'Three months of walking in freedom. Extraordinary.',
    scripture: 'So if the Son sets you free, you will be free indeed.',
    scriptureRef: 'John 8:36',
    icon: '👑',
    color: '#9B59B6',
  },
  {
    days: 365,
    label: 'One Year Free',
    description: 'A full year. This is who you are now.',
    scripture: 'No, in all these things we are more than conquerors through him who loved us.',
    scriptureRef: 'Romans 8:37',
    icon: '🎖️',
    color: '#F0B454',
  },
];

export const PHYSICAL_CHALLENGES = [
  { id: '1', label: '20 Push-ups', description: 'Drop and give yourself 20' },
  { id: '2', label: '30 Jumping Jacks', description: 'Get your heart pumping' },
  { id: '3', label: '1-Minute Plank', description: 'Hold steady for 60 seconds' },
  { id: '4', label: 'Cold Water', description: 'Splash cold water on your face' },
  { id: '5', label: '10 Burpees', description: 'Full body reset' },
  { id: '6', label: '5-Minute Walk', description: 'Step outside and breathe' },
];

export const getRandomCrisisVerse = (): Verse => {
  return CRISIS_VERSES[Math.floor(Math.random() * CRISIS_VERSES.length)];
};

export const getDailyVerse = (): Verse => {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
  );
  return DAILY_VERSES[dayOfYear % DAILY_VERSES.length];
};
