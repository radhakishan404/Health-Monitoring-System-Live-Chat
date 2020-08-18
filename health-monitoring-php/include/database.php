<?php

/**
 * A session is a way to store information (in variables) to be used across multiple pages.
 * Unlike a cookie, the information is not stored on the users computer.
 * A session is started with the session_start() function.
 * Session variables are set with the PHP global variable: $_SESSION.
 */
session_start();

class Database
{
    private $connection;

    function __construct()
    {
        $this->open_connection();
    }

    /**
     * connect_errno:   The mysqli_connect_errno() function returns the error code from the last connection error, if any.
     * Syntax:  mysqli_connect_errno();
     * Return Value: 	Returns an error code value. Zero if no error occurred
     * 
     * connect_error:   The mysqli_connect_error() function returns the error description from the last connection error, if any.
     * Syntax:  mysqli_connect_error();
     * Return Value: 	Returns a string that describes the error. NULL if no error occurred
     * 
     */
    public function open_connection()
    {
        $this->connection = new mysqli("localhost", "root", "", "health_monitoring");

        if ($this->connection->connect_errno) {
            die("Failed to connect to the Database: (" . $this->connection->connect_errno . ") " . $this->connection->connect_error);
        }
        /** else{
                echo "Connected successfully";
            }*/
    }

    /**
     * The mysqli_close() function closes a previously opened database connection.
     * Syntax:  mysqli_close(connection);
     * connection -	Required. Specifies the MySQL connection to close
     * Return Value: 	TRUE on success. FALSE on failure
     */
    public function close_connection()
    {
        if (isset($this->connection)) {
            $this->connection->close();
            unset($this->connection);
        }
    }

    /**
     * The mysqli_query() function performs a query against the database.
     * Syntax:  mysqli_query(connection,query,resultmode);
     * connection -	Required. Specifies the MySQL connection to use
     * query -	Required. Specifies the query string
     * resultmode -	Optional. A constant. Either:   MYSQLI_USE_RESULT (Use this if we have to retrieve large amount of data)
     *                                              MYSQLI_STORE_RESULT (This is default)
     * Return Value: 	For successful SELECT, SHOW, DESCRIBE, or EXPLAIN queries it will return a mysqli_result object. 
     *                  For other successful queries it will return TRUE. FALSE on failure
     */
    public function query($sql)
    {
        $result = $this->connection->query($sql);

        if (!$result) {
            die("Database query failed" . $this->connection->error);
        }

        return $result;
    }

    /**
     * The mysqli_fetch_assoc() function fetches a result row as an associative array.
     * Note: Fieldnames returned from this function are case-sensitive.
     * Syntax:  mysqli_fetch_assoc(result);
     * result 	Required. Specifies a result set identifier returned by mysqli_query(), mysqli_store_result() or mysqli_use_result()
     * Return Value: 	Returns an associative array of strings representing the fetched row. 
     *                  NULL if there are no more rows in result-set
     */
    public function fetch($query)
    {
        $row = $query->fetch_assoc();
        return $row;
    }

    /**
     * The mysqli_real_escape_string() function escapes special characters in a string for use in an SQL statement.
     * Syntax:  mysqli_real_escape_string(connection,escapestring);
     * connection -	Required. Specifies the MySQL connection to use
     * escapestring -	Required. The string to be escaped. Characters encoded are NUL (ASCII 0), \n, \r, \, ', ", and Control-Z.
     * Return Value: 	Returns the escaped string
     */
    public function escape_string($string)
    {
        $string = $this->connection->real_escape_string($string);
        return $string;
    }

    /**
     * The mysqli_num_rows() function is an inbuilt function in PHP which is used to return the number of rows present in the result set. 
     * It is generally used to check if data is present in the database or not. 
     * To use this function, it is mandatory to first set up the connection with the MySQL database.
     * Syntax:  mysqli_num_rows ( $result );
     * Parameters:  This function accepts single parameter $result. 
     *              It is a mandatory parameter and represents the result set returned by a fetch query in MySQL.
     * Return Value:    It returns the number of rows present in a result set.
     *                  Consider there is a table named geek in a MySQL database named Geeks. Below is the description of the table geek.
     */
    public function num_rows($result)
    {
        $rows = $result->num_rows;
        return $rows;
    }

    /**
     * The mysqli_affected_rows() function returns the number of affected rows in the previous SELECT, INSERT, UPDATE, REPLACE, or DELETE query.
     * Syntax: mysqli_affected_rows(connection);
     * connection - 	Required. Specifies the MySQL connection to use
     * Return Value: 	An integer > 0 indicates the number of rows affected. 0 indicates that no records were affected. 
     *                  -1 indicates that the query returned an error
     */
    public function affected_rows()
    {
        $affected_rows = $this->connection->affected_rows;
        return $affected_rows;
    }

    /**
     * The mysqli_insert_id() function returns the id (generated with AUTO_INCREMENT) used in the last query.
     * Syntax: insert_id(connection);
     * connection -	Required. Specifies the MySQL connection to use
     * Return Value: 	Returns an integer with the value of the AUTO_INCREMENT field that was updated by the last query. 
     *                  If the number is > max integer value, it will return a string. 
     *                  Returns zero if there were no update or no AUTO_INCREMENT field
     */
    public function last_insert_id()
    {
        $last_insert_id = $this->connection->insert_id;
        return $last_insert_id;
    }

    /**
     * The strip_tags() function is an inbuilt function in PHP which is used to strips a string from HTML, and PHP tags. 
     * This function returns a string with all NULL bytes, HTML and PHP tags stripped from a given $str.
     */
    public function strip_all($string)
    {
        $string = strip_tags($string);
        return $string;
    }

    public function strip_selected($string, $allowTags)
    {
        $string = strip_tags($string, $allowTags);
        return $string;
    }
}
