import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace models.voting{
   export enum voteType {
      YES_NO,
      CHOICE,
   }
   export enum voteState {
      INITIALIZED,
      ACTIVE,
      CLOSED,
   }
   export class Subject extends Asset {
      sID: string;
      description: string;
      type: voteType;
      currentState: voteState;
      choices: string[];
      voteCount: number;
      owner: Regulator;
   }
   export class Vote extends Asset {
      voteID: string;
      choice: number;
      voter: Voter;
      subject: Subject;
   }
   export class Regulator extends Participant {
      rID: string;
      name: string;
   }
   export class Voter extends Participant {
      nationalID: string;
      name: string;
   }
   export class castVote extends Transaction {
      poll: Subject;
      choice: number;
   }
   export class startVote extends Transaction {
      poll: Subject;
   }
   export class endVote extends Transaction {
      poll: Subject;
   }
// }
