import React, { useEffect, useState } from 'react';
import { gapi } from 'gapi-script';
import { initGoogleApi, reauthenticate, checkScopes } from '../utils/googleApi';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    gapi.load('client:auth2', () => {
      initGoogleApi()
        .then(() => {
          console.log('Google API initialized');
          listTasks();
          checkScopes();
        })
        .catch((error) => {
          console.error('Error initializing Google API:', error);
        });
    });
  }, []);

  const listTasks = () => {
    gapi.client.tasks.tasks
      .list({ tasklist: '@default' })
      .then((response) => {
        setTasks(response.result.items || []);
      })
      .catch((error) => {
        console.error('Error fetching tasks:', error);
      });
  };

  return (
    <div className="tasks-widget">
      <h3>Tasks</h3>
      {/* Uncomment if needed */}
      {/* <button onClick={reauthenticate} className="reauth-button">Reauthenticate</button> */}
      <ul className="tasks-list">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <li key={task.id} className="task-item">
              <strong>{task.title}</strong> - {task.status}
            </li>
          ))
        ) : (
          <p className="no-tasks">No tasks available.</p>
        )}
      </ul>
    </div>
  );
};

export default Tasks;
