json.user_id @message.user.id
json.user_name @message.user.name
json.date Time.now.to_s
json.content @message.content
json.image @message.image_url
