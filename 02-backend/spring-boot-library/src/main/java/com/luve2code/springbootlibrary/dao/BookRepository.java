package com.luve2code.springbootlibrary.dao;

import com.luve2code.springbootlibrary.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;


//import the "Book" class and primary key of type "Long" from database. defined in "Book Class"

public interface BookRepository extends JpaRepository<Book,Long> {

}
