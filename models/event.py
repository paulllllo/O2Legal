#!/usr/bin/python3
""" holds class Post"""
import models
from models.base_model import BaseModel, Base
from os import getenv
import sqlalchemy
from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.ext.mutable import MutableList
from sqlalchemy import PickleType
from sqlalchemy.orm import relationship


class Event(BaseModel, Base):
    """Representation of event"""
    if models.storage_t == "db":
        __tablename__ = 'events'
        client = Column(String(128), nullable=False)
        topic = Column(String(128), nullable=False, default='')
        description = Column(String(1024), nullable=False, default='')
        date = Column(String(128), nullable=False, default='')
        state = Column(String(128), nullable=False, default='')
    else:
        client = ""
        topic = ""
        description = ""
        time = ""
        state = ""

    def __init__(self, *args, **kwargs):
        """initializes state"""
        super().__init__(*args, **kwargs)
