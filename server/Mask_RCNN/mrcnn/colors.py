import random
import colorsys

class Colors:
    def __init__(self):
        self.rod_counter = [0,1.0,1.0]
        self.particle_counter = [0.25,1.0,1.0]
        self.triangle_counter = [0.5,1.0,1.0]
        self.cube_counter = [0.75,1.0,1.0]

    def update_counter(self, shape):
        counter = self.get_counter(shape)
        if counter[1] >= 0.15:
            counter[1] -= 0.001
        else:
            counter[2] -= 0.0005
    
    def get_rgb_color(self, shape):
        counter = tuple(self.get_counter(shape))
        return colorsys.hsv_to_rgb(*counter)

    def get_counter(self, shape):
        if shape == "rod":
            return self.rod_counter
        elif shape == "particle":
            return self.particle_counter
        elif shape == "triangle":
            return self.triangle_counter
        elif shape == "cube":
            return self.cube_counter

    def get_random_color(self, shape):
        self.update_counter(shape)

col = Colors()
