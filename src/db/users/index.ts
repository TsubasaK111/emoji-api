import list from "./list";

class User{

  id: number;
  name: string;
  createdAt: Date;
   
  constructor(dbUser){
    this.id = dbUser.id;
    this.name = dbUser.name;
    this.createdAt = new Date(dbUser.created_at);
  }

  serialize() {
  // Formats object, removes any data that shouldn't be sent to client.
    return {
      id: this.id,
      name: this.name
    };
  };
}

export default (knex) => {
  return {
    list: list(knex, User),
  };
};
