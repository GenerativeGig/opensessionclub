import { Migration } from '@mikro-orm/migrations';

export class Migration20221101180104 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "actor" add column "email" text not null;');
    this.addSql('alter table "actor" add constraint "actor_email_unique" unique ("email");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "actor" drop constraint "actor_email_unique";');
    this.addSql('alter table "actor" drop column "email";');
  }

}
