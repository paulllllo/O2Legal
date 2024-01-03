#!/usr/bin/python
""" holds class Comment"""
import models
from models.base_model import BaseModel, Base
from os import getenv
import sqlalchemy
from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.ext.mutable import MutableList
from sqlalchemy import PickleType
from sqlalchemy.orm import relationship


class Comment(BaseModel, Base):
    """Representation of comment """
    if models.storage_t == "db":
        __tablename__ = 'comments'
        text = Column(String(1024), nullable=False, default='')
        post_id = Column(String(60), ForeignKey('posts.id'), nullable=False)
        upvotes = Column(MutableList.as_mutable(PickleType), nullable=False,
                         default=[])
        author_id = Column(String(60), ForeignKey('users.id'), nullable=False)
        post = relationship("Post", back_populates="comments")
        author = relationship("User", back_populates="comments")

    else:
        post_id = ""
        upvotes = []
        author_id = ""

    def __init__(self, *args, **kwargs):
        """initializes comment"""
        super().__init__(*args, **kwargs)
