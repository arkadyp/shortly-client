class Addusers < ActiveRecord::Migration
  def self.up
      create_table :users do |t|
          t.string :username
          t.string :password_hash
          t.string :password_salt
          t.string :hashId
          t.timestamps :null => false
      end
  end

  def self.down
      drop_table :users
  end
end