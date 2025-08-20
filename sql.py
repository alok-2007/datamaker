import sqlite3

con = sqlite3.connect("post.db")
with open("insert.sql", "w", encoding="utf-8") as f:
    for line in con.iterdump():
        f.write(f"{line}\n")
con.close()
