import React, { useState } from 'react';

/** Toast update-hook */
import { useToastUpdate } from '../contexts/ToastContext';

/** CSS, UI */
import { Button, Container, Form, Segment } from 'semantic-ui-react';

/** Types */
import { Question, Difficulty } from 'game-common';

/** Services */
import QuestionService from '../services/questions';

const QuestionForm: React.FC = () => {
  const [answer_1, setAnswer_1] = useState<string>('');
  const [answer_2, setAnswer_2] = useState<string>('');
  const [answer_3, setAnswer_3] = useState<string>('');
  const [answer_4, setAnswer_4] = useState<string>('');
  const [correctAnswer, setCorrectAnswer] = useState<string>('');
  const [difficulty, setDifficult] = useState<Difficulty>('easy');
  const [question, setQuestion] = useState<string>('');

  const toastUpdate: (newMsg: string) => void = useToastUpdate();

  const answersAreValid = (): boolean =>
    Array.of(answer_1, answer_2, answer_3, answer_4).every(
      (answer: string) => answer.length
    );

  const clearStates = (): void => {
    setAnswer_1('');
    setAnswer_2('');
    setAnswer_3('');
    setAnswer_4('');
    setDifficult('easy');
    setCorrectAnswer('');
    setQuestion('');
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    const newQuestion: Question = {
      answers: [answer_1, answer_2, answer_3, answer_4],
      correctAnswer: correctAnswer,
      difficulty: difficulty,
      question: question
    };

    try {
      await QuestionService.create(newQuestion);
      clearStates();
      toastUpdate('Question added!');
    } catch (e) {
      toastUpdate('Error on adding question');
    }
  };

  const answerOptions = [
    { key: '1', text: 'Answer 1', value: answer_1 },
    { key: '2', text: 'Answer 2', value: answer_2 },
    { key: '3', text: 'Answer 3', value: answer_3 },
    { key: '4', text: 'Answer 4', value: answer_4 }
  ];

  const difficultyOptions = [
    { key: '1', text: 'Easy', value: 'easy' },
    { key: '2', text: 'Medium', value: 'medium' },
    { key: '3', text: 'Hard', value: 'hard' }
  ];

  return (
    <Container
      style={{
        backgroundColor: '#1b1c1d',
        border: '3px solid #f2711c',
        position: 'relative',
        top: '5em'
      }}
    >
      <Segment inverted style={{ paddingTop: '2em' }}>
        <Form inverted size={'huge'} onSubmit={handleSubmit}>
          <Form.Field
            control={'textarea'}
            label={'Question'}
            rows={'2'}
            id="questionInput"
            value={question}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setQuestion(e.target.value)
            }
          />

          <Form.Group widths={'equal'}>
            <Form.Field
              control={'input'}
              label={'Answer 1'}
              rows={'2'}
              id="answer1"
              value={answer_1}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setAnswer_1(e.target.value)
              }
            />
            <Form.Field
              control={'input'}
              label={'Answer 2'}
              rows={'2'}
              id="answer2"
              value={answer_2}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setAnswer_2(e.target.value)
              }
            />
          </Form.Group>

          <Form.Group widths={'equal'}>
            <Form.Field
              control={'input'}
              label={'Answer 3'}
              rows={'2'}
              id="answer3"
              value={answer_3}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setAnswer_3(e.target.value)
              }
            />
            <Form.Field
              control={'input'}
              label={'Answer 4'}
              rows={'2'}
              id="answer4"
              value={answer_4}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setAnswer_4(e.target.value)
              }
            />
          </Form.Group>

          <Form.Group style={{ paddingTop: '1em' }} widths={'equal'}>
            <Form.Select
              rows={'2'}
              label="Pick correct answer"
              id="correctAnswer"
              options={answerOptions}
              onChange={(e, { value }) => setCorrectAnswer(value as string)}
            />
            <Form.Select
              rows={'2'}
              label="Pick difficulty"
              id="difficulty"
              options={difficultyOptions}
              onChange={(e, { value }) => setDifficult(value as Difficulty)}
            />
          </Form.Group>

          <Button
            disabled={
              !answersAreValid() || !difficulty || !question || !correctAnswer
            }
            type={'submit'}
            style={{ margin: '1em' }}
          >
            Submit
          </Button>
        </Form>
      </Segment>
    </Container>
  );
};

export default QuestionForm;
