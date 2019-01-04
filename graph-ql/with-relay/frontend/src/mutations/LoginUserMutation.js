import { commitMutation, graphql } from 'react-relay';
import environment from '../Environment';

const mutation = graphql`
  mutation LoginUserMutation($loginUserInput: LoginUserInput!) {
    loginUser(input: $loginUserInput) {
      user {
        id
        username
        password
        fullname
      }
    }
  }
`;

export default (username, password, callback) => {
  const variables = {
    loginUserInput: {
      username, 
      password, 
      clientMutationId: ''
    }
  };

  commitMutation(environment, {
    mutation,
    variables,
    onCompleted: (response) => {
      callback(response.loginUser.user);
    },
    onError: err => console.log(err)
  });
};
