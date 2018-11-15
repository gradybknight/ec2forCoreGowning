CREATE TABLE `transactions` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `initials` varchar(200) DEFAULT NULL,
    `team` varchar(200) DEFAULT NULL,
    `entrytimestamp` bigint DEFAULT NULL,
    `exittimestamp` bigint DEFAULT NULL,
    `gown` tinyint(1) DEFAULT NULL,
    `glove` tinyint(1) DEFAULT NULL,
PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
