CREATE DATABASE RESERVATION DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

use RESERVATION;

CREATE TABLE `user` (
  `user_id` mediumint(8) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(30) NOT NULL,
  `department` varchar(30) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COMMENT='사용자';

CREATE TABLE `meeting_room` (
  `room_id` mediumint(8) NOT NULL AUTO_INCREMENT COMMENT '회의실 번호',
  `room_name` varchar(30) NOT NULL COMMENT '회의실 이름',
  `size` enum('4','6','8') NOT NULL COMMENT '회의실 수용 인원',
  PRIMARY KEY (`room_id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COMMENT='회의실';


CREATE TABLE `reservation` (
  `user_id` mediumint(8) NOT NULL,
  `room_id` mediumint(8) NOT NULL,
  `reservation_time` timestamp NOT NULL,
  PRIMARY KEY (`room_id`,`reservation_time`),
  CONSTRAINT `FK_reservation_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FK_reservation_meeting_room` FOREIGN KEY (`room_id`) REFERENCES `meeting_room` (`room_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='예약 현황';


INSERT INTO meeting_room(room_name, size) VALUES ('101', '4'), ('102', '4'), ('103', '6'), ('201', '4'), ('202', '8');
INSERT INTO user(user_name, department) VALUES ('Faker', 'mid'), ('Khan', 'top'), ('Clid', 'jungle'), ('Teddy', 'ad carry'), ('Mata', 'support'), ('Kkoma', 'coach'), ('Crazy', 'top'), ('Haru', 'jungle'), ('Gori', 'mid'), ('Leo', 'ad carry'), ('Effort', 'support')
