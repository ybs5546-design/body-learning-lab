import { sqliteTable, text, integer, uniqueIndex } from "drizzle-orm/sqlite-core";
export const classes = sqliteTable("classes", {
  id: text("id").primaryKey(), owner: text("owner").notNull(), title: text("title").notNull(),
  code: text("code").notNull().unique(), open: integer("open").notNull().default(1), created: text("created").notNull()
});
export const students = sqliteTable("students", {
  id: text("id").primaryKey(), classId: text("class_id").notNull().references(()=>classes.id,{onDelete:"cascade"}),
  number: integer("number").notNull(), name: text("name").notNull(), tokenHash: text("token_hash").notNull(),
}, t=>[uniqueIndex("student_number").on(t.classId,t.number)]);
export const submissions = sqliteTable("submissions", {
  id: text("id").primaryKey(), studentId: text("student_id").notNull().references(()=>students.id,{onDelete:"cascade"}),
  lesson: integer("lesson").notNull(), data: text("data").notNull(), updated: text("updated").notNull()
}, t=>[uniqueIndex("student_lesson").on(t.studentId,t.lesson)]);
