import { Migration } from '@mikro-orm/migrations';

export class Migration20221023110036 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "actor" ("id" serial, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" text not null, "lower_case_name" text not null, "password" text not null, constraint "actor_pkey" primary key ("id"));');
    this.addSql('alter table "actor" add constraint "actor_name_unique" unique ("name");');
    this.addSql('alter table "actor" add constraint "actor_lower_case_name_unique" unique ("lower_case_name");');

    this.addSql('create table "session" ("id" serial, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "title" text not null, constraint "session_pkey" primary key ("id"));');
  }

}
