# Creativity Kernel

This is the main repository of the Creativity Kernel.

## Parts of this project

There are multiple parts to this project:

- `backend` contains of a Express/Node service
- `client` contains a React app created from, and still on `create-react-app`
- `mongo_db_snapshot` is a database dump from a development database that will be periodically updated. See `README.md` in the backend folder for more information.

You can learn more about how to run each project from their README.md files.

## Developing and contributing to this project

The easiest way to develop and contribute to this project is to run the entire
setup locally. To do that, you will need to have the mongodb service running on
your local instance.

## Installing MongoDB

This project currently uses Mongodb 3.6.x (We mirror the version used on the mlab service). There are two ways to install Mongodb on your local machine:

- Download the binaries and follow the instructions at https://www.mongodb.com/download-center/community
- If you're using home brew, simply

```
brew install mongodb@3.6
```
