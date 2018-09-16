# README

## DB設計

### users table

|Column|Type|Options|
|------|----|-------|
|name|string|index: true, null: false, unique: true|
|email|string|null: false, unique: true|
|password|string|null: false|

#### Association
- has_many :messages
- has_many :groups, through: :group_users
- has_many :group_users


### messages table

|Column|Type|Options|
|------|----|-------|
|chat|text||
|image|string||
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|

#### Association
- belongs_to :user
- belongs_to :group


### groups table

|Column|Type|Options|
|------|----|-------|
|group_name|string|null: false|


#### Association
- has_many :messages
- has_many :groups, through: :group_users
- has_many :group_users


### group_users table

|Column|Type|Options|
|------|----|-------|
|group|references|null: false, foreign_key: true|
|user|references|null: false, foreign_key: true|


#### Association
- belongs_to :user
- belongs_to :group
