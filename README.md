# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

## users table

|Column|Type|Options|
|------|----|-------|
|name|string|index: true, null: false, unique: true|
|e-mail|string|null: false, unique: true|
| password|string|null: false|

### association
- has_many :messages
- has_many :groups, through: :group_users
- has_many :group_users


## messages table

|Column|Type|Options|
|------|----|-------|
|chat|text|
|image|string|
|group_id|reference|null: false, foreign_key: true|
|user_id|reference|null: false, foreign_key: true|

### association
- belongs_to :user
- belongs_to :group

## gruops table
|Column|Type|Options|
|------|----|-------|
|group_name|string|null: false|

### association
 - has_many :messages
 - has_many :users, through: :group_users
 - has_many :group_users


## group_users table
|Column|Type|Options|
|------|----|-------|
|group_id|reference|null: false, foreign_key: true|
|user_id|reference|null: false, foreign_key: true|

### association
- belongs_to :gruop
- belongs_to :user
