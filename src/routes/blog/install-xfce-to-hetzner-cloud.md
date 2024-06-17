---
title: Install Xfce4 to Hetzner Cloud Ubuntu server
createdAt: 2024-06-17T13:19:19+03:00
description: How to install Xfce4 on a Hetzner Cloud Ubuntu server to create a lightweight desktop environment for remote access.
tags: tutorials, xfce, rdp, ubuntu, servers, hetzner
prevUrl: chatgpt4
prevTitle: A comprehensive comparison of ChatGPT 3.5 and ChatGPT 4
---

[Xfce](https://xfce.org/) is a lightweight desktop environment for UNIX-like operating systems. It aims to be fast and low on system resources, while still being visually appealing and user friendly.

Installing Xfce4 on a [Hetzner Cloud](https://www.hetzner.com/cloud/) [Ubuntu server](https://ubuntu.com/server) is a straightforward process that can transform a headless server into a fully functional remote desktop environment. This article will guide you through the installation process, covering the prerequisites and detailed steps to get your Xfce4 desktop environment up and running.

A basic Hetzner Cloud server with at least 1 CPU, 2GB of RAM, and 20GB of storage should suffice for running Xfce4 and related components smoothly. While Xfce4 is lightweight compared to other desktop environments, having these resources ensures a responsive and efficient experience.

First you should make sure that your Ubuntu server is up to date. Keeping your system updated not only provides the latest features but also patches security vulnerabilities, which is crucial for a server environment.

If you are logged in as the `root`, you do not need to use `sudo` before commands. You should not use the `root` user for daily tasks, so it is recommended to create a new user with `sudo` privileges and use that account for regular operations.

Updating your server can be done by logging into your server via SSH and running the following commands:

```bash
sudo apt update  
sudo apt upgrade
```

Once your server is up to date, the next step is to install Xfce4. Xfce4 is known for its speed and low resource usage, making it an ideal choice for cloud servers. You can install Xfce4 and its additional goodies with the following command:

```bash
sudo apt install xfce4
```

In addition to Xfce4, you need an [X server](https://wiki.ubuntu.com/X/Architecture) to manage the graphical interface. The `xorg` package can be installed using the command:

```bash
sudo apt install xorg
```

This package includes the necessary components to start and manage the graphical environment on your server.

A display manager is also required to handle user sessions. [LightDM](https://wiki.ubuntu.com/LightDM) is a popular and lightweight display manager that pairs well with Xfce4. You can install it with the command:

```bash
sudo apt install lightdm
```

During the installation, you might be prompted to select LightDM as the default display manager. Confirm this selection to proceed.

To access your Xfce4 desktop environment remotely, you need to install a remote desktop protocol (RDP) server. [XRDP](https://linuxize.com/post/how-to-install-xrdp-on-ubuntu-20-04/) is a reliable choice that allows you to connect to your server using an RDP client.

```bash
sudo apt install xrdp
```

Once installed, configure `XRDP` to use `Xfce4` by creating a `.xsession` file in your home directory with the following content:

```bash
echo xfce4-session > ~/.xsession
```

This ensures that XRDP starts an Xfce4 session when you log in remotely.

After configuring XRDP, it is essential to start and enable the service so that it runs automatically at boot. Use the following commands:

```bash
sudo systemctl enable xrdp    
sudo systemctl start xrdp
```

With XRDP configured and running, you can now connect to your Xfce4 desktop environment from your local machine. If you are using macOS, the [Microsoft Remote Desktop](https://apps.apple.com/us/app/microsoft-remote-desktop/id1295203466) application from the Mac App Store is a suitable client. Open Microsoft Remote Desktop, add a new PC with the IP address of your Hetzner server, and connect using your server's login credentials.

If everything is set up correctly, you should see the XRDP login screen. Enter your credentials to access the Xfce4 desktop environment. From here, you can use your cloud server just like any other desktop, with the ability to install and run graphical applications.

Hopefully everything went smoothly and you have now fully working Xfce desktop environment on your Hetzner Cloud Ubuntu server. Happy computing!
