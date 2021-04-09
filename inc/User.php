<?php

class User
{

    private $UserID;
    private $UserGender;
    private $UserBirthday;
    private $UserFirstName;
    private $UserLastName;
    private $UserAddress;
    private $UserPLZ;
    private $UserCity;
    private $UserName;
    private $UserPassword;
    private $UserEMail;
    private $UserImage;
    private $UserMoney;

    /**
     * User constructor.
     * @param $UserID
     * @param $UserGender
     * @param $UserBirthday
     * @param $UserFirstName
     * @param $UserLastName
     * @param $UserAddress
     * @param $UserPLZ
     * @param $UserCity
     * @param $UserName
     * @param $UserPassword
     * @param $UserEMail
     * @param $UserImage
     * @param $UserMoney
     * @param $UserActive
     * @param $UserBanned
     */
    public function __construct($UserID, $UserGender, $UserBirthday, $UserFirstName, $UserLastName, $UserAddress, $UserPLZ, $UserCity, $UserName, $UserPassword, $UserEMail, $UserImage, $UserMoney, $UserActive, $UserBanned)
    {
        $this->UserID = $UserID;
        $this->UserGender = $UserGender;
        $this->UserBirthday = $UserBirthday;
        $this->UserFirstName = $UserFirstName;
        $this->UserLastName = $UserLastName;
        $this->UserAddress = $UserAddress;
        $this->UserPLZ = $UserPLZ;
        $this->UserCity = $UserCity;
        $this->UserName = $UserName;
        $this->UserPassword = $UserPassword;
        $this->UserEMail = $UserEMail;
        $this->UserImage = $UserImage;
        $this->UserMoney = $UserMoney;
        $this->UserActive = $UserActive;
        $this->UserBanned = $UserBanned;
    }


    /**
     * @return mixed
     */
    public function getUserID()
    {
        return $this->UserID;
    }

    /**
     * @param mixed $UserID
     */
    public function setUserID($UserID)
    {
        $this->UserID = $UserID;
    }

    /**
     * @return mixed
     */
    public function getUserGender()
    {
        return $this->UserGender;
    }

    /**
     * @param mixed $UserGender
     */
    public function setUserGender($UserGender)
    {
        $this->UserGender = $UserGender;
    }

    /**
     * @return mixed
     */
    public function getUserBirthday()
    {
        return $this->UserBirthday;
    }

    /**
     * @param mixed $UserBirthday
     */
    public function setUserBirthday($UserBirthday)
    {
        $this->UserBirthday = $UserBirthday;
    }

    /**
     * @return mixed
     */
    public function getUserFirstName()
    {
        return $this->UserFirstName;
    }

    /**
     * @param mixed $UserFirstName
     */
    public function setUserFirstName($UserFirstName)
    {
        $this->UserFirstName = $UserFirstName;
    }

    /**
     * @return mixed
     */
    public function getUserLastName()
    {
        return $this->UserLastName;
    }

    /**
     * @param mixed $UserLastName
     */
    public function setUserLastName($UserLastName)
    {
        $this->UserLastName = $UserLastName;
    }

    /**
     * @return mixed
     */
    public function getUserAddress()
    {
        return $this->UserAddress;
    }

    /**
     * @param mixed $UserAddress
     */
    public function setUserAddress($UserAddress)
    {
        $this->UserAddress = $UserAddress;
    }

    /**
     * @return mixed
     */
    public function getUserPLZ()
    {
        return $this->UserPLZ;
    }

    /**
     * @param mixed $UserPLZ
     */
    public function setUserPLZ($UserPLZ)
    {
        $this->UserPLZ = $UserPLZ;
    }

    /**
     * @return mixed
     */
    public function getUserCity()
    {
        return $this->UserCity;
    }

    /**
     * @param mixed $UserCity
     */
    public function setUserCity($UserCity)
    {
        $this->UserCity = $UserCity;
    }

    /**
     * @return mixed
     */
    public function getUserName()
    {
        return $this->UserName;
    }

    /**
     * @param mixed $UserName
     */
    public function setUserName($UserName)
    {
        $this->UserName = $UserName;
    }

    /**
     * @return mixed
     */
    public function getUserPassword()
    {
        return $this->UserPassword;
    }

    /**
     * @param mixed $UserPassword
     */
    public function setUserPassword($UserPassword)
    {
        $this->UserPassword = $UserPassword;
    }

    /**
     * @return mixed
     */
    public function getUserEMail()
    {
        return $this->UserEMail;
    }

    /**
     * @param mixed $UserEMail
     */
    public function setUserEMail($UserEMail)
    {
        $this->UserEMail = $UserEMail;
    }

    /**
     * @return mixed
     */
    public function getUserImage()
    {
        return $this->UserImage;
    }

    /**
     * @param mixed $UserImage
     */
    public function setUserImage($UserImage)
    {
        $this->UserImage = $UserImage;
    }

    /**
     * @return mixed
     */
    public function getUserMoney()
    {
        return $this->UserMoney;
    }

    /**
     * @param mixed $UserMoney
     */
    public function setUserMoney($UserMoney)
    {
        $this->UserMoney = $UserMoney;
    }

    /**
     * @return mixed
     */
    public function getUserActive()
    {
        return $this->UserActive;
    }

    /**
     * @param mixed $UserActive
     */
    public function setUserActive($UserActive)
    {
        $this->UserActive = $UserActive;
    }

    /**
     * @return mixed
     */
    public function getUserBanned()
    {
        return $this->UserBanned;
    }

    /**
     * @param mixed $UserBanned
     */
    public function setUserBanned($UserBanned)
    {
        $this->UserBanned = $UserBanned;
    }
    private $UserActive;
    private $UserBanned;

}