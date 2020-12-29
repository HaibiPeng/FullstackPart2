import React from 'react';

const Header = ({ title }) => <h2>{title}</h2>;

const Part = ({ part, exercises }) => <p>{part} {exercises}</p>;

const Content = ({ parts }) => (
  <>
<<<<<<< HEAD
    {parts.map(part => <Part key={part.id} part={part.name} exercises={part.exercises} />)}
=======
    {parts.map(part => (<Part key={part.id} part={part.name} exercises={part.exercises} />))}
>>>>>>> ddb650527d0c56e0b8bc87c1fa927a80d5525efc
  </>
);

const Total = ({ parts }) => (
  <p>
    <strong>
      {`total of ${parts.map(part => part.exercises)
                        .reduce((sum, course) => sum + course)} exercises`}
    </strong>
  </p>
);

const Courseinfo = ({ course }) => {
  return (
    <>
      <Header title={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};

export default Courseinfo;
