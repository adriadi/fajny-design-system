// Example texts for the Input types, shared by the preview and the Figma page so both show the same
// field. Neutral product text: a label, a placeholder hint, a value, a wrong value, help and error.
export const TYPES = [
  { name: 'Text', label: 'Email', placeholder: 'e.g. name@example.com', value: 'name@example.com', wrong: 'name@',
    help: 'Only used to reply to you.', error: 'Enter an email address like name@example.com.' },
  { name: 'Select', label: 'Topic', placeholder: 'Choose a topic', value: 'A question about a project', wrong: '',
    help: 'Pick the closest one.', error: 'Choose a topic.' },
  { name: 'Textarea', label: 'Message', placeholder: 'What would you like to ask?', value: 'Could we talk about the next release?', wrong: '',
    help: 'A few sentences are enough.', error: 'Enter a message.' },
  { name: 'Password', label: 'Password', placeholder: 'Enter your password', value: 'correct-horse', wrong: 'abc',
    help: 'At least 8 characters.', error: 'Enter at least 8 characters.' },
];

// The help text of a disabled field says why it's disabled (decision 60).
export const DISABLED_HELP = 'Only the workspace owner can change this.';
