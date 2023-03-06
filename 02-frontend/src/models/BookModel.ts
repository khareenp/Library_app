/*Defines what spring boot backend and database are looking for, for books
so then when we call the API to fetch the data, it can be converted to an object to use in the application
*/

class BookModel {
  id: number;
  title: string;
  author?: string; //the question mark means optional varaiable, it can be null
  description?: string;
  copies?: number;
  copiesAvailable?: number;
  category?: string;
  img?: string;

  constructor(
    id: number,
    title: string,
    author: string,
    description: string,
    copies: number,
    copiesAvailable: number,
    category: string,
    img?: string
  ) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.description = description;
    this.copies = copies;
    this.copiesAvailable = copiesAvailable;
    this.category = category;
    this.img = img;
  }
}

export default BookModel;
