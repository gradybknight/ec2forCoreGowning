CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `initials` varchar(200) DEFAULT NULL,
  `team` varchar(20) DEFAULT NULL,
  `firstname` varchar(200) DEFAULT NULL,
  `lastname` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
