# Creative Kernel - Backend

This is the service component of the Creative Kernel. It is a node.js app built
with the [Express Framework](http://expressjs.com/).

## Installing dependencies.

To start, install dependencies using npm

```bash
> npm install
```

## Running the service

```bash
> npm start # defaults to listening at localhost:3001
```

## Bootstrapping the database

If you have MongoDB installed locally and available via the terminal, you can
bootstrap, start and reset the MongoDB instance whenever you are developing.

To set up the database locally for the first time:

```bash
> npm run init:db    # this creates the folders where mongodb looks for
> npm run start:db   # this starts mongodb pointing to the db folder created above
# This runs the mongodb service and it takes over control of the current session
```

In a separate terminal instance, and in this folder:

```bash
> npm run restore:db
```

This will take the db snapshot and populate the instance with the data.

Otherwise, just start the database normally, and `ctrl-c` it when you're done
with it. Of course, you can always start it as a service or move the data directory.
I'll leave this as an exercise for the reader.

```bash
> npm run start:db
```

If you want to reset the database back to the snapshot, with the `mongod` service
running, simply

```bash
> npm run delete:db     # this deletes ALL data in the database
> npm run restore:db    # resets it back to the state stored in version control
```
