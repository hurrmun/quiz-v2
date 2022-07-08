import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('users', (table) => {
      table.uuid('user_id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
      table.string('username').unique().notNullable();
      table.string('email').unique().notNullable();
      table.string('password').notNullable();
      // table.string('profile_pic');
      // table.string('description');
      table.timestamp('updated_at', { useTz: true }).defaultTo(knex.fn.now());
    })
    .createTable('quizzes', (table) => {
      table.uuid('quiz_id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
      table.uuid('user_id').references('user_id').inTable('users');
      table.string('name').notNullable();
      table.string('description');
      table.integer('version').defaultTo(1).notNullable();
      table.timestamp('updated_at', { useTz: true }).defaultTo(knex.fn.now());
    })
    .createTable('quizzes_submitted', (table) => {
      table.primary(['user_id', 'quiz_id'], {
        constraintName: 'submitted_quiz_id',
      });
      table.uuid('user_id').references('user_id').inTable('users');
      table.uuid('quiz_id').references('quiz_id').inTable('quizzes');
      table.integer('quiz_version').notNullable();
      table.integer('quiz_max_score').notNullable();
      table.integer('score').notNullable();
      table.timestamp('updated_at', { useTz: true }).defaultTo(knex.fn.now());
    })
    .createTable('questions', (table) => {
      table
        .uuid('question_id')
        .primary()
        .defaultTo(knex.raw('uuid_generate_v4()'));
      table.uuid('quiz_id').references('quiz_id').inTable('quizzes');
      table.string('question').notNullable();
      table.string('additional_details');
      table.string('question_pic');
      //   table.uuid('answer').references('option_id').inTable('options');
      table.timestamp('updated_at', { useTz: true }).defaultTo(knex.fn.now());
    })
    .createTable('options', (table) => {
      table
        .uuid('option_id')
        .primary()
        .defaultTo(knex.raw('uuid_generate_v4()'));
      table.uuid('question_id').references('question_id').inTable('questions');
      table.string('option').notNullable();
      table.timestamp('updated_at', { useTz: true }).defaultTo(knex.fn.now());
    })
    .alterTable('questions', (table) => {
      table.uuid('answer').references('option_id').inTable('options');
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .alterTable('questions', (table) => {
      table.dropColumn('answer');
    })
    .dropTable('options')
    .dropTable('questions')
    .dropTable('quizzes_submitted')
    .dropTable('quizzes')
    .dropTable('users');
}
