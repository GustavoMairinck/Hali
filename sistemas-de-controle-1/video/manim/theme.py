"""Padrão visual comum (o mesmo do site e do Remotion)."""
from manim import Text, config

BG = '#0f0f0f'
Y = '#f5c518'
BL = '#7cc4ff'
BAD = '#ff8a65'
TX = '#ececec'
MU = '#a9a9a9'
AXIS = '#777777'
FONT = 'Inter'

config.pixel_width = 1200
config.pixel_height = 540
config.frame_height = 8
config.frame_width = 8 * 1200 / 540
config.frame_rate = 30
config.background_color = BG


def txt(s, size=32, col=TX, weight='MEDIUM'):
    return Text(s, font=FONT, font_size=size * 1.25, color=col, weight=weight)
