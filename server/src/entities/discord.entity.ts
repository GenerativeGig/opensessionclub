import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Discord extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column()
  access_token: string;

  @Column()
  token_type: string;

  @Column()
  expires_in: number;

  @Column()
  refresh_token: string;

  @Column()
  scope: string;

  @Column()
  actorId: number;

  @CreateDateColumn({ type: "timestamptz" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt: Date;
}

// TODO: Make Open Session Club a PWA
