/**
 * @flow
 * @relayHash 26c728d39d2016478de99f47ad6222f5
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type CreatePostViewerQueryVariables = {||};
export type CreatePostViewerQueryResponse = {|
  +viewer: {|
    +id: string
  |}
|};
export type CreatePostViewerQuery = {|
  variables: CreatePostViewerQueryVariables,
  response: CreatePostViewerQueryResponse,
|};
*/


/*
query CreatePostViewerQuery {
  viewer {
    id
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "viewer",
    "storageKey": null,
    "args": null,
    "concreteType": "Viewer",
    "plural": false,
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "id",
        "args": null,
        "storageKey": null
      }
    ]
  }
];
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "CreatePostViewerQuery",
  "id": null,
  "text": "query CreatePostViewerQuery {\n  viewer {\n    id\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "CreatePostViewerQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": v0
  },
  "operation": {
    "kind": "Operation",
    "name": "CreatePostViewerQuery",
    "argumentDefinitions": [],
    "selections": v0
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'ae4f0362ae37e6fe83706ed5dd13309c';
module.exports = node;
