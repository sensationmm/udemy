/**
 * @flow
 * @relayHash effd264763a0e8a3c11de9f7b164499c
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type CreateUserInput = {
  username: string,
  password: string,
  fullname: string,
  clientMutationId?: ?string,
};
export type LoginUserInput = {
  username: string,
  password: string,
  clientMutationId?: ?string,
};
export type CreateUserMutationVariables = {|
  createUserInput: CreateUserInput,
  loginUserInput: LoginUserInput,
|};
export type CreateUserMutationResponse = {|
  +createUser: ?{|
    +message: ?string
  |},
  +loginUser: ?{|
    +user: ?{|
      +id: string,
      +username: ?string,
      +password: ?string,
      +fullname: ?string,
    |}
  |},
|};
export type CreateUserMutation = {|
  variables: CreateUserMutationVariables,
  response: CreateUserMutationResponse,
|};
*/


/*
mutation CreateUserMutation(
  $createUserInput: CreateUserInput!
  $loginUserInput: LoginUserInput!
) {
  createUser(input: $createUserInput) {
    message
  }
  loginUser(input: $loginUserInput) {
    user {
      id
      username
      password
      fullname
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "createUserInput",
    "type": "CreateUserInput!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "loginUserInput",
    "type": "LoginUserInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "createUser",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "createUserInput",
        "type": "CreateUserInput!"
      }
    ],
    "concreteType": "CreateUserPayload",
    "plural": false,
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "message",
        "args": null,
        "storageKey": null
      }
    ]
  },
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "loginUser",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "loginUserInput",
        "type": "LoginUserInput!"
      }
    ],
    "concreteType": "LoginUserPayload",
    "plural": false,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "user",
        "storageKey": null,
        "args": null,
        "concreteType": "User",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "id",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "username",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "password",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "fullname",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  }
];
return {
  "kind": "Request",
  "operationKind": "mutation",
  "name": "CreateUserMutation",
  "id": null,
  "text": "mutation CreateUserMutation(\n  $createUserInput: CreateUserInput!\n  $loginUserInput: LoginUserInput!\n) {\n  createUser(input: $createUserInput) {\n    message\n  }\n  loginUser(input: $loginUserInput) {\n    user {\n      id\n      username\n      password\n      fullname\n    }\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "CreateUserMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": v1
  },
  "operation": {
    "kind": "Operation",
    "name": "CreateUserMutation",
    "argumentDefinitions": v0,
    "selections": v1
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'c54473c89621d94e0c9d6052b461ed8d';
module.exports = node;
