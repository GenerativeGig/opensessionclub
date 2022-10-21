import { Migration } from '@mikro-orm/migrations';

export class Migration20221021181924 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "session" ("id" serial, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "title" text not null, constraint "session_pkey" primary key ("id"));');
  }

}
