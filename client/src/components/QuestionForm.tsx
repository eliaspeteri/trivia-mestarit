import React, { useState } from 'react';

/** CSS, UI */
import { Button, Container, Form, Segment } from 'semantic-ui-react';

const QuestionForm: React.FC = () => {
  const [answer_1, setAnswer_1] = useState<string>('');
  const [answer_2, setAnswer_2] = useState<string>('');
  const [answer_3, setAnswer_3] = useState<string>('');
  const [answer_4, setAnswer_4] = useState<string>('');
  const [difficulty, setDifficult] = useState<string>('');
  const [correctAnswer, setCorrectAnswer] = useState<string>('');
  const [question, setQuestions] = useState<string>('');

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

  const answersAreValid = (): boolean =>
    Array.of(answer_1, answer_2, answer_3, answer_4).every(
      (answer: string) => answer.length
    );

  const submitClicked = (e: any): void => {
    e.preventDefault();
    console.log(`answer_1`, answer_1);
    console.log(`answer_2`, answer_2);
    console.log(`answer_3`, answer_3);
    console.log(`answer_4`, answer_4);
    console.log(`correctAnswer`, correctAnswer);
    console.log(`difficulty`, difficulty);
    console.log(`correctAnswer`, correctAnswer);
  };

  return (
    <Container
      style={{
        backgroundColor: '#1b1c1d',
        border: '3px solid #f2711c',
        position: 'relative',
        top: '4em'
      }}
    >
      <Segment inverted style={{ paddingTop: '2em' }}>
        <Form inverted size={'huge'}>
          <Form.Field
            control={'textarea'}
            label={'Question'}
            rows={'2'}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setQuestions(e.target.value)
            }
          />

          <Form.Group widths={'equal'}>
            <Form.Field
              control={'input'}
              label={'Answer 1'}
              rows={'2'}
              value={answer_1}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setAnswer_1(e.target.value)
              }
            />
            <Form.Field
              control={'input'}
              label={'Answer 2'}
              rows={'2'}
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
              value={answer_3}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setAnswer_3(e.target.value)
              }
            />
            <Form.Field
              control={'input'}
              label={'Answer 4'}
              rows={'2'}
              value={answer_4}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setAnswer_4(e.target.value)
              }
            />
          </Form.Group>

          <Form.Group style={{ paddingTop: '1em' }} widths={'equal'}>
            <Form.Select
              rows={'2'}
              label="Pick answer"
              options={answerOptions}
              onChange={(e, { value }) => setCorrectAnswer(value as string)}
            />
            <Form.Select
              rows={'2'}
              label="Pick difficulty"
              options={difficultyOptions}
              onChange={(e, { value }) => setDifficult(value as string)}
            />
          </Form.Group>

          <Button
            disabled={
              !answersAreValid() || !difficulty || !question || !correctAnswer
            }
            type={'submit'}
            style={{ margin: '1em' }}
            onClick={submitClicked}
          >
            Submit
          </Button>
        </Form>
      </Segment>
    </Container>
  );
};

export default QuestionForm;
