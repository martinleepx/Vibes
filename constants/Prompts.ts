import type { JournalPrompt } from '@/types';

export const JOURNAL_PROMPTS: JournalPrompt[] = [
  {
    id: '1',
    text: 'What triggered the urge today, and how did you get through it?',
    category: 'trigger',
  },
  {
    id: '2',
    text: 'What are three things you are grateful for right now?',
    category: 'gratitude',
  },
  {
    id: '3',
    text: 'How do you feel about yourself today compared to when you started?',
    category: 'growth',
  },
  {
    id: '4',
    text: 'What does freedom mean to you today?',
    category: 'reflection',
  },
  {
    id: '5',
    text: 'Write a prayer or message to God about where you are in this journey.',
    category: 'reflection',
  },
  {
    id: '6',
    text: 'What situations or emotions make you most vulnerable? How can you prepare?',
    category: 'trigger',
  },
  {
    id: '7',
    text: 'Who in your life would be encouraged to see your progress? Write to them.',
    category: 'gratitude',
  },
  {
    id: '8',
    text: 'What new habits or activities are filling the space that this habit used to occupy?',
    category: 'growth',
  },
  {
    id: '9',
    text: 'What verse or truth has been most meaningful to you this week?',
    category: 'reflection',
  },
  {
    id: '10',
    text: 'Describe the person you are becoming. Who will you be at day 90? Day 365?',
    category: 'growth',
  },
  {
    id: '11',
    text: 'What were you doing when you felt the urge today? What does that tell you?',
    category: 'trigger',
  },
  {
    id: '12',
    text: 'Name five things that are genuinely better in your life since you started this journey.',
    category: 'gratitude',
  },
];

export const getRandomPrompt = (): JournalPrompt => {
  return JOURNAL_PROMPTS[Math.floor(Math.random() * JOURNAL_PROMPTS.length)];
};
