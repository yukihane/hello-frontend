import { objectType, extendType } from "nexus";

export const Task = objectType({
  name: "Task",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("title");
    t.nonNull.boolean("done");
  },
});

export const TasksQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field("tasks", {
      type: "Task",
      resolve(_parent, _args, ctx) {
        return ctx.prisma.task.findMany();
      },
    });
  },
});
