import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1674064836500 implements MigrationInterface {
  name = "Initial1674064836500";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "session_comment" ("id" SERIAL NOT NULL, "text" character varying NOT NULL, "sessionId" integer NOT NULL, "creatorId" integer NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_a2ce2adb9b0b435e88a5b82532b" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "session" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "text" character varying, "start" TIMESTAMP NOT NULL, "stop" TIMESTAMP NOT NULL, "attendeeLimit" integer NOT NULL, "isRemote" boolean NOT NULL, "voiceChannelId" character varying, "voiceChannelUrl" character varying, "location" character varying, "isCancelled" boolean NOT NULL DEFAULT false, "creatorId" integer NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "actor_session" ("actorId" integer NOT NULL, "sessionId" integer NOT NULL, "actorIsPartOfSession" boolean NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_3b2cf4ce4457d252d13ad339b36" PRIMARY KEY ("actorId", "sessionId"))`
    );
    await queryRunner.query(
      `CREATE TABLE "discord" ("id" SERIAL NOT NULL, "userId" character varying NOT NULL, "access_token" character varying NOT NULL, "token_type" character varying NOT NULL, "expires_in" integer NOT NULL, "refresh_token" character varying NOT NULL, "scope" character varying NOT NULL, "actorId" integer NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_1a7493c1f3616a3f3b06aa6781d" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "actor" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "lowerCaseName" character varying NOT NULL, "email" character varying NOT NULL, "lowerCaseEmail" character varying NOT NULL, "password" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "discordId" integer, CONSTRAINT "UQ_d452a7040f3c08451dc9c2f3ba9" UNIQUE ("name"), CONSTRAINT "UQ_d689987de7e1fbb980354894247" UNIQUE ("lowerCaseName"), CONSTRAINT "UQ_3f4517a75abb25bc98610436181" UNIQUE ("email"), CONSTRAINT "UQ_1dda121e7294b79251aa92ac0d3" UNIQUE ("lowerCaseEmail"), CONSTRAINT "REL_17fc447fe41bf341569acb6f6b" UNIQUE ("discordId"), CONSTRAINT "PK_05b325494fcc996a44ae6928e5e" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "session_comment" ADD CONSTRAINT "FK_4e499ea61b902c8ff82e012273a" FOREIGN KEY ("sessionId") REFERENCES "session"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "session_comment" ADD CONSTRAINT "FK_81b6a56711884c2efa0f0c32a86" FOREIGN KEY ("creatorId") REFERENCES "actor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "session" ADD CONSTRAINT "FK_edd8096a8de1a173dc208e610e3" FOREIGN KEY ("creatorId") REFERENCES "actor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "actor_session" ADD CONSTRAINT "FK_75e9d579dba4d91df66a340777d" FOREIGN KEY ("actorId") REFERENCES "actor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "actor_session" ADD CONSTRAINT "FK_bccd221a120324bc8bf5f378403" FOREIGN KEY ("sessionId") REFERENCES "session"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "actor" ADD CONSTRAINT "FK_17fc447fe41bf341569acb6f6bf" FOREIGN KEY ("discordId") REFERENCES "discord"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "actor" DROP CONSTRAINT "FK_17fc447fe41bf341569acb6f6bf"`
    );
    await queryRunner.query(
      `ALTER TABLE "actor_session" DROP CONSTRAINT "FK_bccd221a120324bc8bf5f378403"`
    );
    await queryRunner.query(
      `ALTER TABLE "actor_session" DROP CONSTRAINT "FK_75e9d579dba4d91df66a340777d"`
    );
    await queryRunner.query(
      `ALTER TABLE "session" DROP CONSTRAINT "FK_edd8096a8de1a173dc208e610e3"`
    );
    await queryRunner.query(
      `ALTER TABLE "session_comment" DROP CONSTRAINT "FK_81b6a56711884c2efa0f0c32a86"`
    );
    await queryRunner.query(
      `ALTER TABLE "session_comment" DROP CONSTRAINT "FK_4e499ea61b902c8ff82e012273a"`
    );
    await queryRunner.query(`DROP TABLE "actor"`);
    await queryRunner.query(`DROP TABLE "discord"`);
    await queryRunner.query(`DROP TABLE "actor_session"`);
    await queryRunner.query(`DROP TABLE "session"`);
    await queryRunner.query(`DROP TABLE "session_comment"`);
  }
}
