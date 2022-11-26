/*
Only available if part of session (viewing included)
  Authenticated and Authorized

/comments (sessionId)   / read
/add                    / create
/edit                   / update  (creator)
/remove                 / delete  (creator)

I can integrate discord into my website?

*/

import { SessionComment } from "src/entities/sessionComment.entity";
import { Resolver } from "type-graphql";

@Resolver(SessionComment)
export class SessionCommentResolver {
  // sessionComments() {}
}
