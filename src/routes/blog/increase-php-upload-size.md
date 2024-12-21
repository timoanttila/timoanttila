---
title: Increase PHP upload file size
createdAt: 2024-12-21T07:53:53+03:00
description: Learn how to increase PHP upload file size on Ubuntu and Debian servers.
tags: tutorials, php, ubuntu, servers
prevUrl: install-xfce-to-hetzner-cloud
prevTitle: Install Xfce4 to Hetzner Cloud Ubuntu server
---

By default, PHP limits file uploads to 2MB, which may not be sufficient for most of clients' needs. If you need to upload larger files, such as 10MB, you must modify the PHP configuration. Here's how you can achieve this step-by-step using Ubuntu's command line. The same steps work for Debian too.

My setup:
- Ubuntu
- NGINX
- PHP 8.3
- FastCGI Process Manager (FPM)

Open your terminal and ensure you have `root` or `sudo` access. I have remote access to the server with `root` user with SSH key. All commands work for me without the `sudo` command.

In Debian based operating systems, like Ubuntu, PHP files are located under `/etc/php`. Since we are using NGINX, we want to make changes to FPM's configurations. The right file is located at `/etc/php/8.3/fpm/php.ini`. If you would like to change PHP for Apache2, the right file would be `/etc/php/8.3/apache2/php.ini`.

Open the file for editing using a text editor. I like to use `nano`.

```Shell
sudo nano /etc/php/8.3/apache2/php.ini
```

Search for the following directives in the file: `upload_max_filesize` and `post_max_size`. Use the search feature in `nano` by pressing `CTRL + W` and typing the directive name. Change the values to match your desired file size of 10MB. For example:

```Shell
upload_max_filesize = 10M
post_max_size = 20M
```

After modifying these values, ensure you also verify the `memory_limit` directive. It should be set to a value large enough to handle your file uploads.

```Shell
memory_limit = 32M
```

Save your changes by pressing `CTRL + X`, then `Enter`.

To apply the changes, restart your web server.

```Shell
service php8.3-fpm restart
```

Test the new configuration to confirm the upload limit has increased. You can create a PHP script, for example, `phpinfo.php`, in your web root directory with the following content:

```PHP
<?php
phpinfo();
?>
```

Access this file through your browser and look new values for `upload_max_filesize` and `post_max_size`. Once confirmed, remove the `phpinfo.php` file for security purposes.

Congratulations! You have successfully increased PHP's upload file size limit on Ubuntu.
